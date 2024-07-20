<script lang="ts">
	import { dndzone, type DndEvent, SHADOW_ITEM_MARKER_PROPERTY_NAME } from 'svelte-dnd-action';
	import type { Item } from './item';
	import Letter from './Letter.svelte';
	import { flip } from 'svelte/animate';

	export let item: Item | undefined = undefined;
	export let flipDurationMs = 150;

	let _item: Item | undefined = item;

	type DnDHandler = (e: CustomEvent<DndEvent<Item>>) => void;

	const onConsider: DnDHandler = (e) => {
		_item = e.detail.items[0];
	};

	const onFinalize: DnDHandler = (e) => {
		item = e.detail.items[0];
		_item = item;
	};

	$: considering = _item?.[SHADOW_ITEM_MARKER_PROPERTY_NAME];
	$: items = _item ? [_item] : [];
</script>

<div
	class="aspect-square h-12 w-12 rounded-md bg-stone-900 transition-colors duration-100"
	class:bg-stone-600={considering}
	use:dndzone={{
		items,
		flipDurationMs,
		dropFromOthersDisabled: typeof item !== 'undefined',
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
