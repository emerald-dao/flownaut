<script type="ts">
	import '../app.postcss';
	import '@emerald-dao/design-system/build/variables-dark.css';
	import '@emerald-dao/design-system/build/variables-light.css';
	import '@emerald-dao/design-system/build/variables.css';
	import '@emerald-dao/component-library/styles/app.scss';
	import '$lib/styles/_articles.scss';
	import { setLocale, locale } from '$i18n/i18n-svelte';
	import HeadHrefLangs from '$lib/components/i18n/HeadHrefLangs.svelte';
	import { Header, Footer, TransactionModal } from '@emerald-dao/component-library';
	import { theme } from '$stores/ThemeStore';
	import { logIn, unauthenticate } from '$flow/actions';
	import { user } from '$stores/flow/FlowStore';
	import LocaleSwitcher from '$lib/components/i18n/LocaleSwitcher.svelte';
	import { network } from '$flow/config';
	import { transactionStore } from '$stores/flow/TransactionStore';

	export let data;

	// at the very top, set the locale before you access the store and before the actual rendering takes place
	setLocale(data.locale);

	$: navElements = [
		{
			name: 'Home',
			url: `/${$locale}`
		},
		{
			name: 'Return to Emerald Academy',
			url: `https://academy.ecdao.org/${$locale}`,
			target: '_blank'
		}
	];

	let profile;
	$: if ($user.addr) {
		profile = {
			address: $user.addr,
			avatar: '/new-avatar.png',
			name: 'Traveler',
			type: 'random'
		};
	} else {
		profile = null;
	}

	export const avatarDropdownNav = [];

	$: headerWidth = 'large'; // $page.params.lesson ? 'large' : 'medium';
</script>

<TransactionModal
	transactionInProgress={$transactionStore.progress}
	transactionStatus={$transactionStore.transaction}
	transactionId={$transactionStore.transactionId}
	{network}
	on:close={() => transactionStore.resetTransaction()}
/>

<Header
	themeStore={theme}
	{logIn}
	{unauthenticate}
	{navElements}
	user={$user}
	{profile}
	{network}
	avatarDropDownNavigation={avatarDropdownNav}
	logoHref={`/${$locale}/`}
	logoUrl="/ea-logo.png"
	logoText="Flownaut"
	width={headerWidth}
>
	<LocaleSwitcher slot="commands" />
</Header>
<main>
	<slot />
</main>
<Footer {navElements} logoHref={`/${$locale}/`} logoUrl="/ea-logo.png" logoText="Flownaut" />

<svelte:head>
	<HeadHrefLangs />
</svelte:head>

<style type="scss">
	main {
		display: flex;
		flex-direction: column;
		min-width: 0;
	}
</style>
