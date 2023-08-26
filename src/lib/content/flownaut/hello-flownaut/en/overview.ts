import { DifficultyEnum, type Flownaut } from '$lib/types/content/flownaut.interface';

export const overview: Flownaut = {
	title: 'Hello Flownaut',
	author: {
		name: 'Jacob Tucker',
		socialMediaUrl: 'https://twitter.com/jacobmtucker',
		avatarUrl: 'https://avatars.githubusercontent.com/u/15198786?v=4',
		isVerified: true
	},
	description: 'This level walks you through the very basics of how to play the game.',
	difficulty: DifficultyEnum.Intro
};
