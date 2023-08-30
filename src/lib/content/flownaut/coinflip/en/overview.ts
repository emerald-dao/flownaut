import { DifficultyEnum, type Flownaut } from '$lib/types/content/flownaut.interface';

export const overview: Flownaut = {
	title: 'Coinflip',
	author: {
		name: 'Jacob Tucker',
		socialMediaUrl: 'https://twitter.com/jacobmtucker',
		avatarUrl: 'https://avatars.githubusercontent.com/u/15198786?v=4',
		isVerified: true
	},
	description: 'Use your psychic abilities to guess 10 coinflips in a row.',
	difficulty: DifficultyEnum.Novice
};
