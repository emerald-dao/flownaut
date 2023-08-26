<script type="ts">
	import { transformHeadingToUrl } from '$lib/utilities/dataTransformation/transformHeadingToUrl';
	import { getContext, onMount, tick } from 'svelte';
	import { Button, ProgressSteps } from '@emerald-dao/component-library';
	import type { ProgressStates } from '@emerald-dao/component-library/components/ProgressStep/progress-states.type';
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';
	import EditContent from '../atoms/EditContent.svelte';
	import type { Author as IAuthor } from '$lib/types/content/flownaut.interface';
	import Author from '../atoms/Author.svelte';

	export let headings: Heading[];
	export let externalUrl: string | undefined = undefined;

	interface Heading {
		level: number;
		title: string;
	}

	let elements: HTMLElement[] = [];

	function grabElements() {
		if (headings.length > 0) {
			headings.forEach((headingElement) => {
				const el = document.getElementById(`${transformHeadingToUrl(headingElement.title)}`);
				if (el) {
					elements = [...elements, el];
				}
			});
		}
	}

	async function trackScroll() {
		await tick();

		elements.forEach(async (element, i) => {
			const { top, width } = element.getBoundingClientRect();
			if (width === 0) grabElements(); // fixes weird bug where rects are all 0
			if (top < 200) {
				steps.forEach((step, index) => {
					if (i > index) {
						step.state = 'success';
					} else if (i === index) {
						step.state = 'active';
					} else {
						step.state = 'inactive';
					}
					steps = steps;
				});
			}
		});
	}

	let steps: Step[] = [];

	interface Step {
		name: string;
		state: ProgressStates;
		url?: string;
	}

	function tranformHeadingsToSteps() {
		headings.forEach((heading) => {
			if (heading.level > 1) {
				steps.push({
					name: heading.title,
					state: 'inactive',
					url: `#${transformHeadingToUrl(heading.title)}`
				});
				steps = steps;
			}
		});
	}

	const author: IAuthor = getContext('author-context');
	const metadata = getContext('metadata-context');

	let questsExist = false;
	$: questsExist = headings.some((item) => item.title === 'Quests');

	onMount(() => {
		grabElements();
		trackScroll();
		tranformHeadingsToSteps();
	});
</script>

<svelte:window on:scroll={trackScroll} />

<div class="main-wrapper column-10">
	{#if author}
		<Author
			name={author.name}
			avatarUrl={author.avatarUrl}
			socialMediaUrl={author.socialMediaUrl}
			isVerified={author.isVerified}
			walletAddress={author.walletAddress}
		/>
	{/if}
	{#if steps.length > 0}
		<div class="steps-wrapper">
			<ProgressSteps
				{steps}
				diameter={0.5}
				direction="column-reverse"
				fontSize="xsmall"
				gap={0.4}
				cutLineEnds={false}
				lineHeight="1"
			/>
		</div>
	{/if}
	<div class="column-6 bottom-links-wrapper">
		<EditContent
			href={`https://github.com/emerald-dao/emerald-academy-v2/tree/main/src/lib/content/flownaut/${$page.params.name}/${$page.params.lang}/readme.md`}
			target="_blank"
		/>
	</div>
</div>

<style lang="scss">
	.main-wrapper {
		border-left: 0.5px solid var(--clr-border-primary);
		padding-block: var(--space-9);
		padding-left: var(--space-4);
	}

	.no-margin {
		margin: 0px;
	}
	a {
		color: var(--clr-heading-main);
	}

	.steps-wrapper {
		margin-left: 10px;
	}
	.bottom-links-wrapper {
		margin-left: var(--space-4);
	}
</style>
