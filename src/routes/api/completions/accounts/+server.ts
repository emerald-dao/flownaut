import { json } from '@sveltejs/kit';
import { createClient } from '@supabase/supabase-js';
import { env as PrivateEnv } from '$env/dynamic/private';
import { env as PublicEnv } from '$env/dynamic/public';

const academySupabase = createClient(
	PublicEnv.PUBLIC_ACADEMY_SUPABASE_URL,
	PrivateEnv.SUPABASE_ACADEMY_SERVICE_KEY
);

export const GET = async () => {
	const { data, error } = await academySupabase.rpc('flownaut_complition_accounts');

	if (error) {
		return json({ error: error.message });
	}

	return json(data);
};
