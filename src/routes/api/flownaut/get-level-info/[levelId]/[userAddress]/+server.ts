import { json } from '@sveltejs/kit';
import { createClient } from '@supabase/supabase-js';
import { env as PrivateEnv } from '$env/dynamic/private';
import { env as PublicEnv } from '$env/dynamic/public';

const academySupabase = createClient(PublicEnv.PUBLIC_ACADEMY_SUPABASE_URL, PrivateEnv.SUPABASE_ACADEMY_SERVICE_KEY);

export const GET = async ({ params }) => {
    const { data } = await academySupabase
        .from('flownaut')
        .select('completed, contract_address')
        .eq('user_address', params.userAddress)
        .eq('level_id', params.levelId);

    if (!data || data.length === 0) {
        return json({ status: 'NOT STARTED', contract_address: '' })
    } else if (data[0].completed) {
        return json({ status: 'COMPLETED', contract_address: data[0].contract_address })
    } else {
        return json({ status: 'IN PROGRESS', contract_address: data[0].contract_address })
    }
}