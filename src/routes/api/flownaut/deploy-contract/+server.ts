import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { sign } from './signer';

export async function POST({ request }: { request: RequestHandler }) {
  const { signable } = await request.json();
  const signature = sign(signable.message)
  return json({
    signature
  })
}