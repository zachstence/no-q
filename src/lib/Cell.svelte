<script lang="ts">
	import { dndzone } from 'svelte-dnd-action';
	import type { Item } from './item';
	import Letter from './Letter.svelte';

	export let item: Item | undefined = undefined;

	$: items = item ? [item] : [];
</script>

<div
	class="aspect-square h-12 w-12 rounded-md bg-stone-900 transition-colors duration-100"
	use:dndzone={{ items }}
	on:consider={(e) => (item = e.detail.items[0])}
	on:finalize={(e) => (item = e.detail.items[0])}
>
	{#if item}
		<Letter>
			{item.letter}
		</Letter>
	{/if}
</div>
