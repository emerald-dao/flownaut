<script type="ts">
	import { page } from '$app/stores';
	import { Button, Seo } from '@emerald-dao/component-library';
	import { user } from '$stores/flow/FlowStore';
	import Icon from '@iconify/svelte';
	import { createNewInstance } from '$lib/utilities/api/flownaut/createNewInstance';
	import { getUserLevelInfo } from '$lib/utilities/api/flownaut/getUserLevelInfo';
	import { submitLevel } from '$lib/utilities/api/flownaut/submitLevel';
	import LevelStatus from '$lib/components/flownaut/LevelStatus.svelte';
	import Author from '$lib/components/atoms/Author.svelte';
	import { onMount } from 'svelte';
	import { getBalance } from '$flow/actions';
	import DifficultyLabel from '$lib/components/flownaut/DifficultyLabel.svelte';

	export let data;

	$: previousExample = data.content[findExampleIndex - 1];
	$: nextExample = data.content[findExampleIndex + 1];

	$: findExampleIndex = data.content.findIndex((obj) => obj.slug === `flownaut/${$page.params.id}`);

	$: startLevelButtonState = $user.loggedIn ? 'active' : 'disabled';

	async function startLevel() {
		startLevelButtonState = 'loading';
		const result = await createNewInstance($page.params.id);
		if (result.error) {
			console.error(result.error);
			startLevelButtonState = 'disabled';
		} else {
			startLevelButtonState = 'done';
			await refreshLevelInfo();
		}
	}

	async function refreshLevelInfo() {
		const { status, contract_address } = await getUserLevelInfo($page.params.id);
		data.status = status;
		data.contract_address = contract_address;
		await logData();
	}

	async function submit() {
		const { error, success } = await submitLevel($page.params.id);
		if (!success) {
			console.error(error);
		} else {
			await refreshLevelInfo();
			alert('Great job! You solved ' + data.overview.title);
		}
	}

	async function logData() {
		console.clear();
		if (data.status === 'NOT STARTED') {
			console.log("Click 'Start Level' when you are ready to go.");
		} else if (data.status === 'NOT LOGGED IN') {
			console.log('Log in to view data about this level.');
		} else {
			console.log('Player Address:', $user.addr);
			if (data.contract_address) {
				console.log('Contract Address:', data.contract_address);
			}
			if ($user.loggedIn) {
				const balance = await getBalance($user.addr);
				console.log('Player Balance:', balance);
			}
		}
	}

	$: $user && refreshLevelInfo();

	onMount(async () => {
		logData();
	});
</script>

<section
	class="introduction center column-8"
	style={`background-image: radial-gradient(
    rgba(18, 18, 18, 0.96),
		rgba(18, 18, 18, 0.93),
    rgba(18, 18, 18, 0.85)
  ), url("/flownaut/flownaut_${data.overview.id}.png")`}
>
	<div class="column-2">
		<h1 class="w-medium">{data.overview.title}</h1>
		{#if data.overview.description}
			<p>{data.overview.description}</p>
		{/if}
	</div>
	<div class="row-2">
		<LevelStatus status={data.status} />
		<DifficultyLabel difficulty={data.overview.difficulty} />
	</div>
	<Author
		name={data.overview.author.name}
		avatarUrl={data.overview.author.avatarUrl}
		socialMediaUrl={data.overview.author.socialMediaUrl}
		isVerified={data.overview.author.isVerified}
		walletAddress={data.overview.author.walletAddress}
	/>
</section>
<section class="section-large main-section container-small">
	<article>
		<svelte:component this={data.readme} />
	</article>

	<div class="row-4">
		<Button
			on:click={startLevel}
			size="large"
			type="ghost"
			color="neutral"
			state={startLevelButtonState}
			statusIconsPosition="left"
		>
			{#if data.status === 'NOT STARTED'}
				<Icon icon="tabler:flag" />
				Start Level
			{/if}
			{#if data.status === 'IN PROGRESS' || data.status === 'COMPLETED'}
				<Icon icon="tabler:refresh" />
				Restart Level
			{/if}
			{#if data.status === 'NOT LOGGED IN'}
				Please log in
			{/if}
		</Button>

		{#if data.status === 'IN PROGRESS'}
			<Button on:click={submit} size="large">
				<Icon icon="tabler:file-import" />
				Submit
			</Button>
		{/if}
	</div>

	<div class="bottom-wrapper">
		{#if previousExample}
			<a
				class="step-back each-adjacent-wrapper"
				href={`/${$page.params.lang}/${previousExample.slug.split('/')[1]}`}
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
				href={`/${$page.params.lang}/${nextExample.slug.split('/')[1]}`}
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
	}

	.main-section {
		display: flex;
		flex-direction: column;
		gap: var(--space-9);

		.bottom-wrapper {
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
</style>
