import type { ExpertiseEnum } from './metadata/expertise.enum';

export interface Overview {
	title: string;
	slug?: string;
	excerpt: string;
	metadata: ContentMetadata;
	author?: Author;
}

interface ContentMetadata {
	expertise?: ExpertiseEnum;
	duration?: string;
	prerequisites?: string[];
	price?: string;
	faqs?: Faq[];
}

export interface Faq {
	question: string;
	answer: string;
}

export interface Author {
	name: string;
	socialMediaUrl: string;
	avatarUrl?: string;
	isVerified: boolean;
	walletAddress?: string;
}
