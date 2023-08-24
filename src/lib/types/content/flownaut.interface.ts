import type { ChallengeState } from '../flownaut/challenge-state.interface';
import type { Author } from './content-overview.interface';

export interface Flownaut {
	title: string;
	author: Author;
	description?: string;
}

export interface FlownautWithStatusAndSlug extends Flownaut {
	status: ChallengeState;
	slug: string;
}

export interface FlownautWithSlug extends Flownaut {
	slug: string;
}
