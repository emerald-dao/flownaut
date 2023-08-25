<script type="ts">
	import { LL } from '$i18n/i18n-svelte';
	import { createSearchStore, searchHandler } from '$stores/searchBar';
	import { onDestroy } from 'svelte';
	import { Seo } from '@emerald-dao/component-library';
	import ChallengeCard from '$lib/components/flownaut/ChallengeCard.svelte';

	export let data;

	$: searchCadence = data.flownauts.map((example) => ({
		...example,
		searchTerms: `${example.title}`
	}));

	$: searchStore = createSearchStore(searchCadence);

	$: unsubscribe = searchStore.subscribe((model) => searchHandler(model));

	onDestroy(() => {
		unsubscribe();
	});
</script>

<section class="container-medium section-large column-6">
	<div class="title-wrapper">
		<h1 class="w-medium">The Flownaut</h1>
		<p class="small">
			The Flownaut is a Web3/Cadence based wargame inspired by <a
				href="https://ethernaut.openzeppelin.com/"
				target="_blank"
				rel="noreferrer">Ethernaut</a
			>. Each level is a smart contract that needs to be 'hacked'. The game is 100% open source and
			all levels are contributions made by other players. Do you have an interesting idea? You can
			add your own level
			<a
				href="https://github.com/emerald-dao/flownaut/tree/main/src/lib/content/flownaut"
				target="_blank"
				rel="noreferrer">here</a
			>.
		</p>
	</div>
	{#if data.flownauts.length === 0}
		<p><em>{$LL.NO_EXAMPLES_FOUND()}</em></p>
	{:else}
		<div class="main">
			{#if $searchStore.search.length > 0 && $searchStore.filtered.length === 0}
				<p>No results found</p>
			{/if}
			{#each $searchStore.filtered as content, i}
				<ChallengeCard challenge={content} {i} />
			{/each}
		</div>
	{/if}
</section>

<Seo
	title={`Flownaut | Emerald Academy`}
	description="A Cadence hacking game inspired by Ethernaut."
	type="WebPage"
	image="https://academy.ecdao.org/favicon.png"
/>

<style type="scss">
	section {
		.title-wrapper {
			display: flex;
			flex-direction: column;
			gap: var(--space-3);
			align-items: center;
			justify-content: center;
			text-align: center;
			margin-bottom: var(--space-10);
		}

		.main {
			display: grid;
			grid-template-columns: 1fr 1fr 1fr;
			gap: var(--space-4) var(--space-13);
		}

		p {
		}
	}
</style>
