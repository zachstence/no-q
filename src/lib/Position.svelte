<script lang="ts">
	import { dndzone } from 'svelte-dnd-action';
	import Letter from './Letter.svelte';
	import type { PositionStore } from './Position.store';

	export let position: PositionStore;

	export let flipDurationMs: number | undefined = undefined;

	const { items, isDropping, placeItem } = position;
</script>

<div
	class="aspect-square h-12 w-12 rounded-md bg-stone-900 transition-colors duration-100"
	class:bg-stone-600={$isDropping}
	use:dndzone={{
		items: $items,
		flipDurationMs,
		dropFromOthersDisabled: $items.length > 0,
		dropTargetStyle: {}
	}}
	on:consider={(e) => placeItem(e.detail.items[0])}
	on:finalize={(e) => placeItem(e.detail.items[0])}
>
	{#if $position.item}
		<Letter>{$position.item.letter}</Letter>
	{/if}
</div>
