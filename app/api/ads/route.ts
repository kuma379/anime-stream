import { NextResponse } from 'next/server';
import { readFileSync, existsSync } from 'fs';
import path from 'path';

const REPO_FILE = path.join(process.cwd(), 'data', 'ads.json');
function readAds() {
  try { if (existsSync(REPO_FILE)) return JSON.parse(readFileSync(REPO_FILE, 'utf-8')); } catch {}
  return [];
}

export async function GET() { return NextResponse.json(readAds()); }