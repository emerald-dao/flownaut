import { DifficultyEnum, type Flownaut } from '$lib/types/content/flownaut.interface';

export const overview: Flownaut = {
	title: 'Password',
	author: {
		name: 'Jacob Tucker',
		socialMediaUrl: 'https://twitter.com/jacobmtucker',
		avatarUrl: 'https://avatars.githubusercontent.com/u/15198786?v=4',
		isVerified: true
	},
	description: 'Input the correct password.',
	difficulty: DifficultyEnum.Easy
};
