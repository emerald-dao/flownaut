import { DifficultyEnum, type Flownaut } from '$lib/types/content/flownaut.interface';

export const overview: Flownaut = {
	title: 'Surprise Remover',
	author: {
		name: 'Diego Fornalha',
		socialMediaUrl: 'https://twitter.com/diegofornalha',
		avatarUrl: 'https://avatars.githubusercontent.com/u/15198786?v=4',
		isVerified: true
	},
	description: `Envie um presente vazio para o seu amor.`,
	difficulty: DifficultyEnum.Easy
};
