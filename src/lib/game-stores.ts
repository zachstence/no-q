import { writable, type Readable } from 'svelte/store';
import type { CellStore } from './Cell.svelte';
import { nanoid } from 'nanoid';
import { check } from './check';
import { asyncDerived } from './asyncDerived';

export type GameStores = {
	bank: CellStore[][];
	board: CellStore[][];
	validWords: Readable<string[]>;
};

export const createGameStores = (letters: string[]): GameStores => {
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

	const validWords: Readable<string[]> = asyncDerived(
		board.flatMap((row) => row),
		async ($cells) => {
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

			const wordsWithValid = await Promise.all(
				Array.from(uniqueWords).map(async (word) => [word, await check(word)] as const)
			);

			const validWords = wordsWithValid.filter(([, valid]) => valid).map(([word]) => word);
			return validWords;
		},
		[]
	);

	return {
		bank,
		board,
		validWords
	};
};
