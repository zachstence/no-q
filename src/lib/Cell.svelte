<script lang="ts">
	import { dndzone } from 'svelte-dnd-action';
	import type { Item } from './item';
	import Letter from './Letter.svelte';

	export let items: Item[];
</script>

<div
	class="aspect-square h-12 w-12 rounded-md bg-stone-900 transition-colors duration-100"
	use:dndzone={{ items }}
	on:consider={(e) => (items = e.detail.items)}
	on:finalize={(e) => (items = e.detail.items)}
>
	{#if items[0]}
		<Letter>
			{items[0].letter}
		</Letter>
	{/if}
</div>
