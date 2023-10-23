import { DifficultyEnum, type Flownaut } from '$lib/types/content/flownaut.interface';

export const overview: Flownaut = {
	title: 'Acetone Store',
	author: {
		name: 'Jonosuke',
		socialMediaUrl: 'https://twitter.com/jonosuke2023',
		avatarUrl: 'https://avatars.githubusercontent.com/u/14267423',
		isVerified: true
	},
	description: `Based on the reentrancy attack found in Uniswap, find a way to drain the balance.`,
	difficulty: DifficultyEnum.Advanced
};
