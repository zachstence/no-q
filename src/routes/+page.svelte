<script lang="ts">
	import Cell from '$lib/Cell.svelte';
	import type { Item } from '$lib/item';
	import { nanoid } from 'nanoid';

	const item: Item | undefined = {
		id: nanoid(),
		letter: 'X'
	};

	let item1: Item | undefined = item;
	let item2: Item | undefined = undefined;

	$: console.log({ item1, item2 });
</script>

<div class="flex flex-row gap-4">
	<Cell bind:item={item1} />
	<Cell bind:item={item2} />
</div>
