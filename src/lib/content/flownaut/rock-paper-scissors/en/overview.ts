import { DifficultyEnum, type Flownaut } from '$lib/types/content/flownaut.interface';

export const overview: Flownaut = {
	title: 'Rock Paper Scissors',
	author: {
		name: 'Jonosuke',
		socialMediaUrl: 'https://twitter.com/jonosuke2023',
		avatarUrl: 'https://avatars.githubusercontent.com/u/14267423',
		isVerified: true
	},
	description: `Beat the cheating rock-paper-scissors game!`,
	difficulty: DifficultyEnum.Easy
};
