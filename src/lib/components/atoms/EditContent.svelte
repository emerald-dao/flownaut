<script type="ts">
	import { Button } from '@emerald-dao/component-library';
	import Icon from '@iconify/svelte';

	export let href: string;
	export let target: '_blank' | '_self' | '_parent' | '_top';
</script>

<a {href} {target} class="sidebar-link">
	<Icon icon="tabler:brand-github" />
	Edit Content
</a>

<style lang="scss">
	a {
		font-size: var(--font-size-2);
	}
</style>
