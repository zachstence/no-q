import { writable, type Writable } from 'svelte/store';
import { type Item } from './item';
import { nanoid } from 'nanoid';
import { PositionStore } from './Position.store';

export class BoardStore {
	bank: Writable<Item[]>;
	positions: PositionStore[];

	constructor(letters: string[]) {
		this.bank = writable(letters.map((letter) => ({ id: nanoid(), letter })));

		this.positions = Array.from({ length: 12 }).flatMap((_, r) =>
			Array.from({ length: 12 }).map((_, c) => new PositionStore({ row: r, col: c }))
		);
	}

	shuffleBank = (): void => {
		this.bank.update((bank) => bank.sort(() => Math.random() - 0.5));
	};
}
