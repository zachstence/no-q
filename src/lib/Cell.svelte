<script lang="ts">
	import { dndzone, type DndEvent, SHADOW_ITEM_MARKER_PROPERTY_NAME } from 'svelte-dnd-action';
	import type { Item } from './item';
	import Letter from './Letter.svelte';

	export let item: Item | undefined = undefined;
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
</script>

<div
	class="aspect-square h-12 w-12 rounded-md bg-stone-900 transition-colors duration-100"
	class:bg-stone-600={considering}
	use:dndzone={{
		items: _item ? [_item] : [],
		dropFromOthersDisabled: typeof item !== 'undefined',
		dropTargetStyle: {}
	}}
	on:consider={onConsider}
	on:finalize={onFinalize}
>
	{#if _item}
		<Letter>
			{_item.letter}
		</Letter>
	{/if}
</div>
