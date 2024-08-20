<script lang="ts">
	import { IconCheck, IconX } from '@tabler/icons-svelte';

	import type { FetchStore } from './fetch-store';
	import { createRelativeDateStore } from './relativeDateStore';

	export let store: FetchStore;
	export let success = 'Success';
	export let error = 'Error';
	export let loading = 'Loading';

	$: lastSuccessRelative = $store.lastSuccess
		? createRelativeDateStore($store.lastSuccess)
		: undefined;
</script>

<!-- TODO don't flash loading state, maybe only show loading state if its loading for >1 sec -->

{#if $store.fetched}
	<span
		class="flex flex-row items-center gap-2 text-base-content/50"
		class:text-success={$store.success}
		class:text-error={$store.error}
	>
		{#if $store.fetching}
			<span class="loading loading-spinner loading-sm" />
			{loading}
		{:else if $store.success}
			<IconCheck />
			{success}
			{#if lastSuccessRelative}
				({$lastSuccessRelative})
			{/if}
		{:else if $store.error}
			<IconX />
			{error}
		{/if}
	</span>
{/if}
