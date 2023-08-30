<script lang="ts">
	import { user } from '../../stores/flow/FlowStore';
	import { locale } from '$i18n/i18n-svelte';
	import type { FlownautWithSlug } from '$lib/types/content/flownaut.interface';
	import type { LevelState } from '$lib/types/flownaut/level-state.interface';
	import { onMount } from 'svelte';
	import Author from '../atoms/Author.svelte';
	import LevelStatus from './LevelStatus.svelte';
	import { getUserLevelInfo } from '$lib/utilities/api/flownaut/getUserLevelInfo';
	import DifficultyLabel from './DifficultyLabel.svelte';

	export let level: FlownautWithSlug;
	export let i: number;

	let status: LevelState;

	async function getStatus() {
		if ($user.addr) {
			status = (await getUserLevelInfo(level.slug.split('/')[1])).status;

			if (!status) {
				status = 'NOT STARTED';
			}
		} else {
			status = 'NOT LOGGED IN';
		}
	}

	onMount(async () => {
		getStatus();
	});

	$: $user && getStatus();

	$: completed = status === 'COMPLETED';
</script>

<a class="card heading" href={`/${$locale}/${level.slug.split('/')[1]}`} class:completed>
	<div class="image-wrapper">
		<div
			class="circle center w-medium"
			style="background-color: var(--clr-surface-secondary)"
			class:completed
		>
			{i + 1}
		</div>
		<div class="image-frame">
			{#if completed}
				<div class="image" style={`background-image: url("/flownaut/flownaut_${i}.png")`} />
			{:else}
				<div
					class="image not-completed"
					style={`background-image: radial-gradient(
				rgba(18, 18, 18, 0.80),
				rgba(18, 18, 18, 1)
				), url("/flownaut/flownaut_${i}.png")`}
				/>
			{/if}
		</div>
	</div>
	<div class="column-7 align-center content-wrapper">
		<div class="column-2">
			<h3 class="w-medium">{`${level.title}`}</h3>
			{#if level.description}
				<p class="small description">{level.description}</p>
			{/if}
		</div>
		<div class="row-2 data">
			<LevelStatus {status} />
			<DifficultyLabel difficulty={level.difficulty} />
		</div>
		<Author
			name={level.author.name}
			avatarUrl={level.author.avatarUrl}
			socialMediaUrl={level.author.socialMediaUrl}
			isVerified={level.author.isVerified}
			walletAddress={level.author.walletAddress}
		/>
	</div>
</a>

<style lang="scss">
	.data {
		flex-wrap: wrap;
		justify-content: center;
	}
	.card {
		background-color: transparent;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-7);
		border: 1px solid var(--clr-border-primary);
		color: var(--clr-text-primary);
		border-radius: var(--radius-4);
		margin-top: 100px;

		&.completed {
			background-color: var(--clr-surface-primary);
		}

		h3 {
			font-size: var(--font-size-5);
		}

		.image-wrapper {
			margin-top: -100px;
			position: relative;

			.circle {
				position: absolute;
				bottom: 30px;
				border: 2px solid var(--clr-border-primary);
				width: 40px;
				height: 40px;
				border-radius: 50%;
				background-color: var(--clr-surface-primary);
				z-index: 1;
			}

			.image-frame {
				border-radius: 50%;
				border: 2px solid var(--clr-border-primary);
				overflow: hidden;

				.image {
					width: 240px;
					height: 240px;
					background-position: center;
					background-repeat: no-repeat;
					background-size: cover;

					&.not-completed {
						filter: blur(2px) grayscale(40%);
					}
				}
			}
		}

		.content-wrapper {
			align-items: center;
			text-align: center;
		}
	}
</style>
