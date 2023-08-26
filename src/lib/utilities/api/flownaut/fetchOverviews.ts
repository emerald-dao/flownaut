import type { Locales } from '$i18n/i18n-types';
import type { Flownaut } from '$lib/types/content/flownaut.interface';

export const fetchOverviews = async (locale?: Locales) => {
	const overviews = import.meta.glob('/src/lib/content/flownaut/**/**/*.ts');

	const iterableFiles = Object.entries(overviews);

	const thisLangFiles = locale
		? iterableFiles.filter(([path]) => {
			return path.split('/')[6] == locale;
		})
		: iterableFiles;

	const allOverviews = await Promise.all(
		thisLangFiles.map(async ([path, resolver], index) => {
			const thisContentLang = path.split('/')[6];

			if (locale && locale != thisContentLang) {
				return;
			}

			const { overview } = await (resolver() as Promise<{ overview: Flownaut }>);

			// Workaround to get the slug and inject it in our overview
			const slug = `${path.split('/')[4]}/${path.split('/')[5]}`;
			overview.slug = slug;
			overview.id = index;

			return overview;
		})
	);

	let difficultyMap = {
		'Intro': 0,
		'Easy': 1,
		'Novice': 2,
		'Intermediate': 3,
		'Advanced': 4,
		'Expert': 5
	};

	// return in order of difficulty
	const sortedOverviews = allOverviews.sort((a, b) => difficultyMap[a?.difficulty] - difficultyMap[b?.difficulty]);

	return sortedOverviews;
};
