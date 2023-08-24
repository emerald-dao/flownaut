<script type="ts">
	import { page } from '$app/stores';
	import { transformUrlToHeading } from '$lib/utilities/dataTransformation/transformUrlToHeading';
	import { Button, Seo } from '@emerald-dao/component-library';
	import { user } from '$stores/flow/FlowStore';
	import Icon from '@iconify/svelte';
	import { createNewInstance } from '$lib/utilities/api/flownaut/createNewInstance';
	import { getUserChallengeStatus } from '$lib/utilities/api/flownaut/getUserChallengeStatus';
	import { submitChallenge } from '$lib/utilities/api/flownaut/submitChallenge';
	import ChallengeStatus from '$lib/components/flownaut/ChallengeStatus.svelte';
	import Author from '$lib/components/atoms/Author.svelte';

	export let data;

	$: routes = [
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
	}

	$: $user && refreshChallengeStatus();
</script>

<section
	class="introduction center column-8"
	style={`background-image: linear-gradient(
    to bottom,
    rgba(18, 18, 18, 0.90),
    rgba(18, 18, 18, 0.99)
  ), url("/flownaut/flownaut_${data.overview.slug.split('/')[1].charAt(0)}.png")`}
>
	<div class="column-2">
		<h1 class="w-medium">{data.overview.title}</h1>
		{#if data.overview.description}
			<p>{data.overview.description}</p>
		{/if}
	</div>
	<ChallengeStatus status={data.status} />
	<Author
		name={data.overview.author.name}
		avatarUrl={data.overview.author.avatarUrl}
		socialMediaUrl={data.overview.author.socialMediaUrl}
		isVerified={data.overview.author.isVerified}
		walletAddress={data.overview.author.walletAddress}
	/>
</section>
<section class="main-section container-small">
	<div class="main-wrapper">
		<article>
			<svelte:component this={data.readme} />
		</article>

		<div class="row-4">
			<Button on:click={() => createNewInstance($page.params.id)}>
				<Icon icon="tabler:file-import" />
				Start Challenge
			</Button>

			<Button on:click={() => submitChallenge($page.params.id)}>
				<Icon icon="tabler:file-import" />
				Submit
			</Button>
		</div>

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
</section>

<Seo
	title={`${data.overview.title} | Flownaut | Emerald Academy`}
	description="A Cadence hacking game inspired by Ethernaut."
	type="WebPage"
	image="https://academy.ecdao.org/favicon.png"
/>

<style type="scss">
	.introduction {
		text-align: center;
		background-position: top;
		padding-block: var(--space-20);
		border-bottom: 0.5px solid var(--clr-border-primary);
	}

	.main-section {
		display: flex;
		flex-direction: column;
		gap: var(--space-7);

		.main-wrapper {
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
	}
</style>
