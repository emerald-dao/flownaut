import { json } from '@sveltejs/kit';
import { createClient } from '@supabase/supabase-js';
import { env as PrivateEnv } from '$env/dynamic/private';
import { env as PublicEnv } from '$env/dynamic/public';
import { config, query } from '@onflow/fcl';
import { switchNetwork, verifyAccountOwnership } from '$flow/utils.js';

const academySupabase = createClient(PublicEnv.PUBLIC_ACADEMY_SUPABASE_URL, PrivateEnv.SUPABASE_ACADEMY_SERVICE_KEY);

export const POST = async ({ request }) => {
    const { user, challenge_id } = await request.json();

    const verifyAccount = await verifyAccountOwnership(user);
    if (!verifyAccount) {
        return json({ success: false, error: 'User object is not valid.' });
    }

    const { data } = await academySupabase
        .from('flownaut')
        .select('contract_address, completed')
        .eq('user_address', user.addr)
        .eq('challenge_id', challenge_id);

    if (!data || data.length === 0) {
        return json({ success: false, error: 'User has not started this challenge.' })
    }

    if (data[0].completed) {
        return json({ success: false, error: 'User has already completed this challenge.' })
    }

    const successScript = await import(`../../../../lib/content/flownaut/${challenge_id}/en/success.cdc?raw`);
    const cadence = successScript.default.replace('"./contract.cdc"', data[0].contract_address);

    try {
        const scriptResult = await query({
            cadence,
            args: (arg, t) => []
        });
        if (scriptResult) {
            const { error } = await academySupabase.from('flownaut').upsert({
                user_address: user.addr,
                challenge_id,
                completed: true
            }, { onConflict: 'user_address,challenge_id' });
            return json({ success: true })
        } else {
            return json({ success: false, error: 'User did not solve the challenge yet.' })
        }
    } catch (e) {
        return json({ success: false, error: e });
    }
}