import type { Locales } from '$i18n/i18n-types.js';
import type { FlownautWithSlug } from '$lib/types/content/flownaut.interface';
import { fetchOverviews } from '$lib/utilities/api/flownaut/fetchOverviews';
import { getUserLevelInfo } from '$lib/utilities/api/flownaut/getUserLevelInfo';
import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
	try {
		const overviewFile = await import(
			`../../../lib/content/flownaut/${params.id}/${params.lang}/overview.ts`
		);
		const readmeFile = await import(
			`../../../lib/content/flownaut/${params.id}/${params.lang}/readme.md`
		);

		const content = (await fetchOverviews(params.lang as Locales)) as FlownautWithSlug[];
		const { status, contract_address } = await getUserLevelInfo(params.id)

		return {
			overview: overviewFile.overview,
			readme: readmeFile.default,
			metadata: readmeFile.metadata,
			status,
			contract_address,
			content
		};
	} catch (e) {
		throw error(404, 'The flownaut you are looking for does not exist');
	}
};
