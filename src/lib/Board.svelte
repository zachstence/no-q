<script lang="ts">
	import { get } from 'svelte/store';
	import { nanoid } from 'nanoid';
	import { derived, writable } from 'svelte/store';
	import type { CellStore } from './Cell.svelte';
	import Grid from './Grid.svelte';
	import Word from './Word.svelte';
	import { WordStore } from './WordStore';

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

	const words = derived(
		board.flatMap((row) => row),
		($cells) => {
			const uniqueWords = new Set<string>();
			for (let r = 0; r < 12; r++) {
				const words = $cells
					.filter((_, i) => Math.floor(i / 12) === r)
					.map((c) => c?.letter ?? ' ')
					.join('')
					.split(' ')
					.filter((word) => word.length > 2);

				words.forEach((word) => uniqueWords.add(word));
			}

			for (let c = 0; c < 12; c++) {
				const words = $cells
					.filter((_, i) => i % 12 === c)
					.map((c) => c?.letter ?? ' ')
					.join('')
					.split(' ')
					.filter((word) => word.length > 2);
				words.forEach((word) => uniqueWords.add(word));
			}
			return Array.from(uniqueWords).map((word) => new WordStore(word));
		}
	);
</script>

<div class="gao-4 flex flex-row">
	<div class="flex flex-col items-center gap-4">
		<Grid cells={board} />
		<Grid cells={bank} />
	</div>
	<table class="h-fit">
		<tbody>
			{#each $words as word}
				<Word {word} />
			{/each}
		</tbody>
	</table>
</div>
