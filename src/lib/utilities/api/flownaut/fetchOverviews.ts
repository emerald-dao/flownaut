import type { Locales } from '$i18n/i18n-types';
import type { Overview } from '$lib/types/content/content-overview.interface';

export const fetchOverviews = async (locale?: Locales) => {
	const overviews = import.meta.glob('/src/lib/content/flownaut/**/**/*.ts');

	const iterableFiles = Object.entries(overviews);

	const thisLangFiles = locale
		? iterableFiles.filter(([path]) => {
				return path.split('/')[6] == locale;
		  })
		: iterableFiles;

	const allOverviews = await Promise.all(
		thisLangFiles.map(async ([path, resolver]) => {
			const thisContentLang = path.split('/')[6];

			if (locale && locale != thisContentLang) {
				return;
			}

			const { overview } = await (resolver() as Promise<{ overview: Overview }>);

			// Workaround to get the slug and inject it in our overview
			const slug = `${path.split('/')[4]}/${path.split('/')[5]}`;
			overview.slug = slug;

			return overview;
		})
	);
	return allOverviews;
};
