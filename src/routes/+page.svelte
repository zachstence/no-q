<script lang="ts">
	import Cell from '$lib/Cell.svelte';
	import type { Item } from '$lib/item';
	import { nanoid } from 'nanoid';

	const a: Item | undefined = {
		id: nanoid(),
		letter: 'a'
	};
	const b: Item | undefined = {
		id: nanoid(),
		letter: 'b'
	};

	let item1: Item | undefined = a;
	let item2: Item | undefined = b;
	let item3: Item | undefined = undefined;

	$: console.log({ item1, item2, item3 });
</script>

<div class="flex flex-row gap-4">
	<Cell bind:item={item1} />
	<Cell bind:item={item2} />
	<Cell bind:item={item3} />
</div>
