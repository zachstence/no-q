import { derived, writable, type Readable, type Writable } from 'svelte/store';
import { type Item } from './item';
import { nanoid } from 'nanoid';
import { PositionStore } from './Position.store';

type Board = {
	[row: number]: {
		[col: number]: Item;
	};
};

export class BoardStore {
	bank: Writable<Item[]>;
	positions: PositionStore[];
	board: Readable<Board>;

	constructor(letters: string[]) {
		this.bank = writable(letters.map((letter) => ({ id: nanoid(), letter })));

		this.positions = Array.from({ length: 12 }).flatMap((_, r) =>
			Array.from({ length: 12 }).map((_, c) => new PositionStore({ row: r, col: c }))
		);

		this.board = derived(this.positions, ($positions) =>
			$positions.reduce<Board>((acc, position) => {
				const { row, col, item } = position;
				if (item) {
					if (!acc[row]) acc[row] = {};
					acc[row][col] = item;
				}
				return acc;
			}, {})
		);
	}

	shuffleBank = (): void => {
		this.bank.update((bank) => bank.sort(() => Math.random() - 0.5));
	};
}
