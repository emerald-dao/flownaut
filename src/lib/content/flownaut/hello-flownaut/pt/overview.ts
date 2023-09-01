import { DifficultyEnum, type Flownaut } from '$lib/types/content/flownaut.interface';

export const overview: Flownaut = {
	title: 'Olá Flownauta',
	author: {
		name: 'Diego Fornalha',
		socialMediaUrl: 'https://twitter.com/diegofornalha',
		avatarUrl: 'https://avatars.githubusercontent.com/u/15198786?v=4',
		isVerified: true
	},
	description: 'Este nível orienta você nos princípios básicos de como jogar o jogo.',
	difficulty: DifficultyEnum.Intro
};
