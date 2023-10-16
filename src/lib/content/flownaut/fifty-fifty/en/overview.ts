import { DifficultyEnum, type Flownaut } from '$lib/types/content/flownaut.interface';

export const overview: Flownaut = {
	title: 'Fifty Fifty',
	author: {
		name: 'Jonosuke',
		socialMediaUrl: 'https://twitter.com/jonosuke2023',
		avatarUrl: 'https://avatars.githubusercontent.com/u/14267423',
		isVerified: true
	},
	description: `Keep the points to yourself!`,
	difficulty: DifficultyEnum.Easy
};
