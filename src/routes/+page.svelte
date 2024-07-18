<script lang="ts">
	import { dndzone, type DndEvent } from 'svelte-dnd-action';
	import Letter from '$lib/Letter.svelte';

	type Item = {
		id: string;
	};

	let items = [
		{ id: 'A' },
		{ id: 'B' },
		{ id: 'C' },
		{ id: 'D' },
		{ id: 'E' },
		{ id: 'F' },
		{ id: 'G' },
		{ id: 'H' },
		{ id: 'I' },
		{ id: 'J' },
		{ id: 'K' },
		{ id: 'L' }
	];

	const handleDndConsider = (e: CustomEvent<DndEvent<Item>>) => {
		items = e.detail.items;
	};
	const handleDndFinalize = (e: CustomEvent<DndEvent<Item>>) => {
		items = e.detail.items;
	};
</script>

<div
	use:dndzone={{ items, flipDurationMs: 200 }}
	on:consider={handleDndConsider}
	on:finalize={handleDndFinalize}
>
	{#each items as item (item.id)}
		<Letter>{item.id}</Letter>
	{/each}
</div>
