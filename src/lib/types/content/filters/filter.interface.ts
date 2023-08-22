import type { ExpertiseEnum } from '../metadata/expertise.enum';

export interface Filter {
	title: string;
	slug: 'type-of-content' | 'subject' | 'expertise';
	filterElement: FilterElement[];
	filterBucket: FilterSlugs[];
}

interface FilterElement {
	icon: string;
	slug: FilterSlugs;
}

export type FilterSlugs = ExpertiseEnum;
