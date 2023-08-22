<script type="ts">
	import { page } from '$app/stores';
	import { transformUrlToHeading } from '$lib/utilities/dataTransformation/transformUrlToHeading';
	import { Breadcrumbs, Button, Seo } from '@emerald-dao/component-library';
	import { user } from '$stores/flow/FlowStore';
	import TableOfContent from '$lib/components/mdsvex/TableOfContent.svelte';
	import Icon from '@iconify/svelte';
	import { createNewInstance } from '$lib/utilities/api/flownaut/createNewInstance';
	import IconCircle from '$lib/components/atoms/IconCircle.svelte';
	import { getUserChallengeStatus } from '$lib/utilities/api/flownaut/getUserChallengeStatus';
	import { submitChallenge } from '$lib/utilities/api/flownaut/submitChallenge';
	import ExamplesLayout from '$lib/components/mdsvex/FlownautLayout.svelte';

	export let data;
	console.log(data);

	$: routes = [
		{
			path: `/${$page.params.lang}/flownaut`,
			label: 'Flownaut'
		},
		{
			path: `/${$page.params.lang}/flownaut/${data.overview.slug}`,
			label: transformUrlToHeading(data.overview.title)
		}
	];

	$: previousExample = data.content[findExampleIndex - 1];
	$: nextExample = data.content[findExampleIndex + 1];

	$: findExampleIndex = data.content.findIndex((obj) => obj.slug === `flownaut/${$page.params.id}`);

	async function refreshChallengeStatus() {
		data.status = await getUserChallengeStatus($page.params.id);
		console.log(data.status);
	}

	$: $user && refreshChallengeStatus();
</script>

<section class="container">
	<div class="main-wrapper">
		<Breadcrumbs {routes} />

		<article>
			<svelte:component this={data.readme} />
		</article>

		{#if data.status === 'IN PROGRESS'}
			<div class="row-2">
				<IconCircle icon="tabler:clock" color="tertiary" />
				<span>In Progress</span>
			</div>
		{:else if data.status === 'COMPLETED'}
			<div class="row-2">
				<IconCircle icon="tabler:check" color="neutral" />
				<span>Completed</span>
			</div>
		{:else if data.status === 'NOT LOGGED IN'}
			<div class="row-2">
				<span>Please log in to view your status.</span>
			</div>
		{:else if data.status === 'NOT STARTED'}
			<div class="row-2">
				<span>Not Started</span>
			</div>
		{/if}

		<Button on:click={() => createNewInstance($page.params.id)}>
			<Icon icon="tabler:file-import" />
			Create Instance
		</Button>

		<Button on:click={() => submitChallenge($page.params.id)}>
			<Icon icon="tabler:file-import" />
			Submit
		</Button>

		<div class="adjacents-wrapper">
			{#if previousExample}
				<a
					class="step-back each-adjacent-wrapper"
					href={`/${$page.params.lang}/flownaut/${previousExample.slug.split('/')[1]}`}
				>
					<Icon icon="tabler:arrow-left" style="color: var(--clr-text-main);" />
					<div class="left-wrapper column-2">
						<p class="heading w-medium">
							{previousExample.title}
						</p>
					</div>
				</a>
			{/if}
			{#if nextExample}
				<a
					class="step-next each-adjacent-wrapper"
					href={`/${$page.params.lang}/flownaut/${nextExample.slug.split('/')[1]}`}
				>
					<div class="column-2">
						<p class="heading w-medium">
							{nextExample.title}
						</p>
					</div>
					<Icon icon="tabler:arrow-right" style="color: var(--clr-text-main);" />
				</a>
			{/if}
		</div>
	</div>
	<div class="toc-wrapper">
		<TableOfContent headings={data.metadata.headings} />
	</div>
</section>

<Seo
	title={`${data.overview.title} | Flownaut | Emerald Academy`}
	description="A Cadence hacking game inspired by Ethernaut."
	type="WebPage"
	image="https://academy.ecdao.org/favicon.png"
/>

<style type="scss">
	section {
		display: flex;
		flex-direction: column;
		gap: var(--space-7);

		@include mq(medium) {
			display: grid;
			grid-template-columns: 4fr 1fr;
		}

		.main-wrapper {
			@include mq(medium) {
				width: 90%;
				overflow: hidden;
			}

			.adjacents-wrapper {
				display: flex;
				flex-direction: column;
				margin-top: var(--space-11);

				@include mq(medium) {
					display: grid;
					grid-template-columns: 1fr 1fr;
					grid-template-areas: 'start end';
					gap: var(--space-4);
				}

				a {
					text-decoration: none;
				}

				.step-back {
					grid-area: start;
				}

				.step-next {
					grid-area: end;
					margin-top: var(--space-4);

					@include mq(medium) {
						margin-top: 0;
					}
				}

				.each-adjacent-wrapper {
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: space-between;
					gap: var(--space-5);
					padding: var(--space-4) var(--space-5);
					border-radius: var(--radius-2);
					border: var(--border-width-primary) var(--clr-border-primary) solid;

					.left-wrapper {
						text-align: end;
					}
				}
			}
		}

		.toc-wrapper {
			display: none;

			@include mq(medium) {
				display: block;
				position: sticky;
				top: 140px;
				height: fit-content;
			}
		}
	}
</style>
