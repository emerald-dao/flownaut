import { json } from '@sveltejs/kit';
import { createClient } from '@supabase/supabase-js';
import { env as PrivateEnv } from '$env/dynamic/private';
import { env as PublicEnv } from '$env/dynamic/public';
import type { RequestHandler } from './$types';
import { verifyAccountOwnership } from '$flow/utils';

const academySupabase = createClient(PublicEnv.PUBLIC_ACADEMY_SUPABASE_URL, PrivateEnv.SUPABASE_ACADEMY_SERVICE_KEY);

export async function POST({ request }: { request: RequestHandler }) {
    const { user, level_id, contract_address } = await request.json();

    const verifyAccount = await verifyAccountOwnership(user);
    if (!verifyAccount) {
        return json({ error: 'User object is not valid.' });
    }

    const { error } = await academySupabase.from('flownaut').upsert({
        user_address: user.addr,
        level_id,
        contract_address,
        completed: false
    }, { onConflict: 'user_address,level_id' });

    return json({ error })
}