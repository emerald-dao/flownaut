import { json } from '@sveltejs/kit';
import { createClient } from '@supabase/supabase-js';
import { env as PrivateEnv } from '$env/dynamic/private';
import { env as PublicEnv } from '$env/dynamic/public';
import { query } from '@onflow/fcl';
import { replaceWithProperValues, verifyAccountOwnership } from '$flow/utils.js';

const academySupabase = createClient(PublicEnv.PUBLIC_ACADEMY_SUPABASE_URL, PrivateEnv.SUPABASE_ACADEMY_SERVICE_KEY);

export const POST = async ({ request }) => {
    const { user, level_id } = await request.json();

    const verifyAccount = await verifyAccountOwnership(user);
    if (!verifyAccount) {
        return json({ success: false, error: 'User object is not valid.' });
    }

    const { data } = await academySupabase
        .from('flownaut')
        .select('contract_address, completed')
        .eq('user_address', user.addr)
        .eq('level_id', level_id);

    if (!data || data.length === 0) {
        return json({ success: false, error: 'User has not started this level.' })
    }

    if (data[0].completed) {
        return json({ success: false, error: 'User has already completed this level.' })
    }

    const successScript = await import(`../../../../lib/content/flownaut/${level_id}/en/success.cdc?raw`);
    const cadence = successScript.default.replace('"./contract.cdc"', data[0].contract_address);

    try {
        const scriptResult = await query({
            cadence: replaceWithProperValues(cadence),
            args: (arg, t) => [
                arg(user.addr, t.Address)
            ]
        });
        if (scriptResult) {
            const { error } = await academySupabase.from('flownaut').upsert({
                user_address: user.addr,
                level_id,
                completed: true
            }, { onConflict: 'user_address,level_id' });
            return json({ success: true })
        } else {
            return json({ success: false, error: 'User did not solve the level yet.' })
        }
    } catch (e) {
        return json({ success: false, error: e.errorMessage });
    }
}