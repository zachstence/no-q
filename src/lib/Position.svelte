<script lang="ts" context="module">
	type Position = {
		row: number;
		col: number;
		item?: Item;
	};
</script>

<script lang="ts">
	import { dndzone, SHADOW_ITEM_MARKER_PROPERTY_NAME, type DndEvent } from 'svelte-dnd-action';
	import Letter from './Letter.svelte';
	import type { Item } from './item';
	import type { Writable } from 'svelte/store';

	export let position: Writable<Position>;

	export let flipDurationMs: number | undefined = undefined;

	$: items = $position.item ? [$position.item] : [];
	$: isDropping = $position.item?.[SHADOW_ITEM_MARKER_PROPERTY_NAME];

	const onConsiderOrFinalize = (e: CustomEvent<DndEvent<Item>>): void => {
		position.update((p) => {
			p.item = e.detail.items[0];
			return p;
		});
	};
</script>

<div
	class="aspect-square h-16 w-16 rounded-md bg-gray-100 transition-colors duration-100"
	class:bg-gray-200={isDropping}
	use:dndzone={{
		items,
		flipDurationMs,
		dropFromOthersDisabled: items.length > 0,
		dropTargetStyle: {}
	}}
	on:consider={onConsiderOrFinalize}
	on:finalize={onConsiderOrFinalize}
>
	{#if $position.item}
		<Letter>{$position.item.letter}</Letter>
	{/if}
</div>
