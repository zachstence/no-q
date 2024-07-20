<script lang="ts">
	import { derived, writable } from 'svelte/store';

	import { type CellStore } from '$lib/Cell.svelte';
	import Grid from '$lib/Grid.svelte';
	import { nanoid } from 'nanoid';

	const cells: CellStore[][] = Array.from({ length: 12 }).map(() =>
		Array.from({ length: 12 }).map(() => writable(undefined))
	);

	cells[0][0].set({
		id: nanoid(),
		letter: 'a'
	});
</script>

<Grid {cells} />
