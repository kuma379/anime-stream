import { getServerUrl } from '@/lib/api';
import { NextResponse } from 'next/server';

export async function GET(_req: Request, { params }: { params: Promise<{ serverId: string }> }) {
  try {
    const { serverId } = await params;
    const data = await getServerUrl(serverId);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}