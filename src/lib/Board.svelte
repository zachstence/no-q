<script lang="ts">
	import { nanoid } from 'nanoid';
	import { writable } from 'svelte/store';
	import type { CellStore } from './Cell.svelte';
	import Grid from './Grid.svelte';

	export let letters: string[];

	const bank: CellStore[][] = Array.from({ length: 2 }).map((_, r) =>
		Array.from({ length: 6 }).map((_, c) =>
			writable({
				id: nanoid(),
				letter: letters[r * 6 + c]
			})
		)
	);

	const board: CellStore[][] = Array.from({ length: 12 }).map(() =>
		Array.from({ length: 12 }).map(() => writable(undefined))
	);
</script>

<div class="flex flex-col items-center gap-4">
	<Grid cells={board} />
	<Grid cells={bank} />
</div>
