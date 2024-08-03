<script lang="ts" context="module">
	export type CellStore = Writable<Item | undefined>;
</script>

<script lang="ts">
	import { dndzone, type DndEvent, SHADOW_ITEM_MARKER_PROPERTY_NAME } from 'svelte-dnd-action';
	import type { Item } from './item';
	import Letter from './Letter.svelte';
	import { flip } from 'svelte/animate';
	import type { Writable } from 'svelte/store';

	export let cell: CellStore;

	export let flipDurationMs = 150;

	$: _item = $cell;

	type DnDHandler = (e: CustomEvent<DndEvent<Item>>) => void;

	const onConsider: DnDHandler = (e) => {
		_item = e.detail.items[0];
	};

	const onFinalize: DnDHandler = (e) => {
		$cell = e.detail.items[0];
		_item = $cell;
	};

	$: considering = _item?.[SHADOW_ITEM_MARKER_PROPERTY_NAME];
	$: items = _item ? [_item] : [];
</script>

<div
	class="aspect-square h-12 w-12 rounded-md transition-colors duration-100"
	class:bg-base-200={!considering}
	class:bg-base-300={considering}
	use:dndzone={{
		items,
		flipDurationMs,
		dropFromOthersDisabled: typeof $cell !== 'undefined',
		dropTargetStyle: {}
	}}
	on:consider={onConsider}
	on:finalize={onFinalize}
>
	{#each items as item (item.id)}
		<div animate:flip={{ duration: flipDurationMs }}>
			<Letter>
				{item.letter}
			</Letter>
		</div>
	{/each}
</div>
