<script lang="ts">
	import type { DifficultyEnum } from '$lib/types/content/flownaut.interface';
	import { Label } from '@emerald-dao/component-library';

	export let difficulty: DifficultyEnum;
</script>

<Label size="small" iconLeft="tabler:flame" color="transparent" hasBorder={false}>
	Difficulty: {difficulty}
</Label>
