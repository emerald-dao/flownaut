<script lang="ts">
	import type { LevelState } from '$lib/types/flownaut/level-state.interface';
	import Icon from '@iconify/svelte';

	export let status: LevelState;
</script>

{#if status}
	<div class="main-wrapper row-1 align-center" class:success={status === 'COMPLETED'}>
		{#if status === 'IN PROGRESS'}
			<Icon width="0.8rem" icon="tabler:clock" />
			<span class="xsmall">In Progress</span>
		{:else if status === 'COMPLETED'}
			<Icon width="0.8rem" icon="tabler:check" />
			<span class="xsmall">Completed</span>
		{:else if status === 'NOT LOGGED IN'}
			<span class="xsmall">Please log in</span>
		{:else if status === 'NOT STARTED'}
			<span class="xsmall">Not Started</span>
		{/if}
	</div>
{/if}

<style lang="scss">
	.main-wrapper {
		border: 1px solid var(--clr-border-primary);
		background-color: var(--clr-neutral-badge);
		padding: var(--space-1) var(--space-4);
		border-radius: var(--radius-4);

		&.success {
			border: 1px solid var(--clr-primary-main);
			background-color: var(--clr-primary-badge);
			color: var(--clr-primary-main);

			span {
				color: var(--clr-primary-main);
			}
		}
	}
</style>
