#!/usr/bin/env node

import { createServer } from 'node:http';
import type { IncomingMessage, ServerResponse } from 'node:http';
import { readFileSync, writeFileSync, readFile } from 'node:fs';
import { resolve, extname, sep } from 'node:path';
import { networkInterfaces } from 'node:os';
import { solve } from './ayto-solver.ts';
import type { Result } from './ayto-solver.ts';
import type { SeasonData, MatchboxResult } from './types.ts';

const PORT = Number(process.env.PORT) || 3000;
const SEASON = process.env.SEASON || 'seasons/current.json';
const PUBLIC = resolve(import.meta.dirname, 'public');
const TYPES: Record<string, string> = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon',
  '.webmanifest': 'application/manifest+json'
};

const loadData = (): SeasonData => JSON.parse(readFileSync(SEASON, 'utf8'));

// Solve state
let status: 'solving' | 'ready' | 'error' = 'solving';
let progress = 0;
let result: Result | null = null;
let error: string | undefined;
let solving = false;
let dirty = false;

async function resolveLoop(): Promise<void> {
  if (solving) { dirty = true; return; }
  solving = true;
  do {
    dirty = false;
    status = 'solving';
    progress = 0;
    try {
      result = await solve(loadData(), f => { progress = f; });
      status = 'ready';
      error = undefined;
    } catch (e) {
      status = 'error';
      error = String((e as Error).message || e);
    }
  } while (dirty);
  solving = false;
}

const isStrArr = (v: unknown): v is string[] => Array.isArray(v) && v.every(x => typeof x === 'string');

function validateMatchbox(list: unknown, men: string[], women: string[], what: string): string | null {
  if (!Array.isArray(list)) return `${what} must be an array`;
  for (const r of list as MatchboxResult[]) {
    if (!r || !men.includes(r.man) || !women.includes(r.woman)) return `${what}: unknown name in ${JSON.stringify(r)}`;
    if (typeof r.isMatch !== 'boolean') return `${what}: isMatch must be boolean in ${JSON.stringify(r)}`;
  }
  return null;
}

function validateSeason(d: any): string | null {
  if (!d || typeof d !== 'object') return 'body must be an object';
  if (!isStrArr(d.men) || !isStrArr(d.women)) return 'men and women must be string arrays';
  const err = validateMatchbox(d.matchboxResults, d.men, d.women, 'matchboxResults');
  if (err) return err;
  if (!Array.isArray(d.matchingNights)) return 'matchingNights must be an array';
  for (const n of d.matchingNights) {
    if (!n || !d.men.includes(n.man) || !d.women.includes(n.woman)) return `matchingNights: unknown name in ${JSON.stringify(n)}`;
    if (!Number.isInteger(n.night) || !Number.isInteger(n.matchCount) || n.matchCount < 0) return `matchingNights: night/matchCount must be integers >= 0 in ${JSON.stringify(n)}`;
  }
  for (const k of ['excludedMen', 'excludedWomen']) {
    if (d[k] !== null && !isStrArr(d[k])) return `${k} must be null or a string array`;
  }
  for (const k of ['doubleMatchMan', 'doubleMatchWoman']) {
    if (d[k] === undefined) return `${k} is required (may be null)`;
  }
  return null;
}

function send(res: ServerResponse, code: number, body: unknown): void {
  res.writeHead(code, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(body));
}

async function readJson(req: IncomingMessage): Promise<any> {
  let body = '';
  for await (const chunk of req) {
    body += chunk;
    if (body.length > 1e6) throw new Error('body too large');
  }
  return JSON.parse(body);
}

function serveStatic(pathname: string, res: ServerResponse): void {
  let file: string;
  try {
    file = resolve(PUBLIC, '.' + decodeURIComponent(pathname === '/' ? '/index.html' : pathname));
  } catch {
    return send(res, 400, { error: 'bad path' });
  }
  if (!file.startsWith(PUBLIC + sep)) return send(res, 404, { error: 'not found' });
  readFile(file, (err, content) => {
    if (err) return send(res, 404, { error: 'not found' });
    res.writeHead(200, { 'Content-Type': TYPES[extname(file)] || 'application/octet-stream' });
    res.end(content);
  });
}

const server = createServer(async (req, res) => {
  const { pathname } = new URL(req.url || '/', 'http://x');
  const route = `${req.method} ${pathname}`;
  try {
    if (route === 'GET /api/data') return send(res, 200, loadData());
    if (route === 'GET /api/result') return send(res, 200, { status, progress, result, ...(error && { error }) });
    if (route === 'PUT /api/data') {
      const data = await readJson(req);
      const err = validateSeason(data);
      if (err) return send(res, 400, { error: err });
      writeFileSync(SEASON, JSON.stringify(data, null, 2) + '\n');
      resolveLoop();
      return send(res, 200, { ok: true });
    }
    if (route === 'POST /api/what-if') {
      const { assumptions } = await readJson(req) ?? {};
      const data = loadData();
      const err = validateMatchbox(assumptions, data.men, data.women, 'assumptions');
      if (err) return send(res, 400, { error: err });
      data.matchboxResults.push(...assumptions);
      return send(res, 200, await solve(data));
    }
    if (req.method === 'GET' && !pathname.startsWith('/api/')) return serveStatic(pathname, res);
    send(res, 404, { error: 'not found' });
  } catch (e) {
    send(res, e instanceof SyntaxError || (e as Error).message === 'body too large' ? 400 : 500, { error: String((e as Error).message) });
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`AYTO server (season: ${SEASON})`);
  for (const addrs of Object.values(networkInterfaces())) {
    for (const a of addrs || []) {
      if (a.family === 'IPv4') console.log(`  http://${a.address}:${PORT}`);
    }
  }
  resolveLoop();
});
