import { DifficultyEnum, type Flownaut } from '$lib/types/content/flownaut.interface';

export const overview: Flownaut = {
	title: 'Senha',
	author: {
		name: 'Diego Fornalha',
		socialMediaUrl: 'https://twitter.com/diegofornalha',
		avatarUrl: 'https://avatars.githubusercontent.com/u/37958057?v=4',
		isVerified: true
	},
	description: 'Insira a senha correta.',
	difficulty: DifficultyEnum.Easy
};
