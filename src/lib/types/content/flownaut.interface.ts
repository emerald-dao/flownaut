import type { LevelState } from '../flownaut/level-state.interface';

export interface Flownaut {
	title: string;
	author: Author;
	description?: string;
	difficulty: DifficultyEnum
}

export interface Author {
	name: string;
	socialMediaUrl: string;
	avatarUrl?: string;
	isVerified: boolean;
	walletAddress?: string;
}


export interface FlownautWithStatusAndSlug extends Flownaut {
	status: LevelState;
	slug: string;
}

export interface FlownautWithSlug extends Flownaut {
	slug: string;
	id: number;
}

export enum DifficultyEnum {
	Intro = 'Intro',
	Easy = 'Easy',
	Novice = 'Novice',
	Intermediate = 'Intermediate',
	Advanced = 'Advanced',
	Expert = 'Expert'
}