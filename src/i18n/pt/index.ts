import type { BaseTranslation } from '../i18n-types';
import { ExpertiseEnum } from '../../lib/types/content/metadata/expertise.enum';

const pt: BaseTranslation = {

	// HomePage / HeroSection
	MAIN_HEADING_1: 'Aprenda tudo sobre a',
	MAIN_HEADING_2: 'Flow Blockchain',
	WELCOME: 'Bem-vindo',

	// HomePage / ExploreSection
	EXPLORE_TAGLINE: 'Explore nossos conteúdos',
	EXPLORE_H1: 'Recursos educacionais gratuitos da Flow Blockchain',

	// HomePage / LearningPathsSection
	PATHS_H1: 'Siga um dos nossos caminhos de aprendizado',

	// HomePage / SocialMediaSection
	SOCIAL_H1: 'Mais de 1.000 estudantes nos recomendam',

	// Catalog / Sidebar
	TYPE_OF_CONTENT: 'Tipo de conteúdo',
	SUBJECT: 'Tema',
	EXPERTISE: 'Experiência',

	// Cadence by example
	SEARCH: 'Buscar',
	NO_EXAMPLES_FOUND: 'Nenhum exemplo encontrado para esta linguagem',

	// Your achievements
	ACHIEVEMENTS_H1: 'Suas conquistas',

	// ContentCard
	SKILLS_YOU_WILL_LEARN: 'Habilidades que você vai aprender',

	START: "Começar",
	CATALOG: "Catálogo",
	SNIPPETS: 'Snippets',
	LEARN: 'Aprenda',
	NEW_TO: 'Novo em',
	START_HERE: 'Comece aqui',

	// Expertise
	[ExpertiseEnum.Advanced]: 'Avançado',
	[ExpertiseEnum.Intermediate]: 'Intermediário',
	[ExpertiseEnum.Beginner]: 'Iniciante',

	// Quickstarts
	MOBILE_QUICKSTARTS: 'Mobile Quickstarts',
	NO_QUICKSTARTS_FOUND: 'Nenhum modelo encontrado para esta linguagem'

};

export default pt;
