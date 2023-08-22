import type { Author } from './content-overview.interface';

export interface Flownaut {
	title: string;
	slug?: string;
	author?: Author;
}
