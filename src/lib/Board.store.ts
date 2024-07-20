import { derived, writable, type Readable, type Writable } from 'svelte/store';
import { type Item } from './item';
import { nanoid } from 'nanoid';
import { PositionStore } from './Position.store';

export class BoardStore {
	bank: Writable<Item[]>;
	positions: PositionStore[];
	words: Readable<string[]>;

	constructor(letters: string[]) {
		this.bank = writable(letters.map((letter) => ({ id: nanoid(), letter })));

		this.positions = Array.from({ length: 12 }).flatMap((_, r) =>
			Array.from({ length: 12 }).map((_, c) => new PositionStore({ row: r, col: c }))
		);

		this.words = derived(this.positions, ($positions) => {
			const { rows, cols } = $positions.reduce<{ rows: number; cols: number }>(
				(acc, { row, col }) => {
					acc.rows = Math.max(acc.rows, row);
					acc.cols = Math.max(acc.cols, col);
					return acc;
				},
				{ rows: 0, cols: 0 }
			);

			const allWords = new Set<string>();
			for (let r = 0; r < rows; r++) {
				const words = $positions
					.filter((p) => p.row === r)
					.map((p) => p.item?.letter ?? ' ')
					.join('')
					.split(' ')
					.filter((word) => word.length > 2);
				words.forEach((word) => allWords.add(word));
			}
			for (let c = 0; c < cols; c++) {
				const words = $positions
					.filter((p) => p.col === c)
					.map((p) => p.item?.letter ?? ' ')
					.join('')
					.split(' ')
					.filter((word) => word.length > 2);
				words.forEach((word) => allWords.add(word));
			}

			return [...allWords];
		});
	}

	shuffleBank = (): void => {
		this.bank.update((bank) => bank.sort(() => Math.random() - 0.5));
	};
}
