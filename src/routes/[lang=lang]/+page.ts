import type { Locales } from '$i18n/i18n-types';
import type { FlownautWithSlug } from '$lib/types/content/flownaut.interface';
import { fetchOverviews } from '$lib/utilities/api/flownaut/fetchOverviews';
import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
	try {
		const flownauts = (await fetchOverviews(params.lang as Locales)) as FlownautWithSlug[];

		return {
			flownauts
		};
	} catch (e) {
		throw error(404, 'Could not fetch Flownaut overviews.');
	}
};
