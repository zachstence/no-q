<script lang="ts">
	import Cell from '$lib/Cell.svelte';
	import type { Item } from '$lib/item';
	import { nanoid } from 'nanoid';
	import { writable, type Writable } from 'svelte/store';

	const a: Item | undefined = {
		id: nanoid(),
		letter: 'a'
	};
	const b: Item | undefined = {
		id: nanoid(),
		letter: 'b'
	};

	let cell1: Writable<Item | undefined> = writable(a);
	let cell2: Writable<Item | undefined> = writable(b);
	let cell3: Writable<Item | undefined> = writable(undefined);

	$: console.log({ $cell1, $cell2, $cell3 });
</script>

<div class="flex flex-row gap-4">
	<Cell bind:cell={cell1} />
	<Cell bind:cell={cell2} />
	<Cell bind:cell={cell3} />
</div>
