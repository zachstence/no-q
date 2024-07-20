<script lang="ts">
	import Cell from '$lib/Cell.svelte';
	import type { Item } from '$lib/item';
	import { nanoid } from 'nanoid';

	const item: Item | undefined = {
		id: nanoid(),
		letter: 'X'
	};

	let items1: Item[] = [item];
	let items2: Item[] = [];

	$: console.log({ items1, items2 });
</script>

<div class="flex flex-row gap-4">
	<Cell bind:items={items1} />
	<Cell bind:items={items2} />
</div>
