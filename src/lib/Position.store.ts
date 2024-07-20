import {
	derived,
	writable,
	type Invalidator,
	type Readable,
	type Subscriber,
	type Unsubscriber,
	type Writable
} from 'svelte/store';
import type { Item } from './item';
import { SHADOW_ITEM_MARKER_PROPERTY_NAME } from 'svelte-dnd-action';

export type Position = {
	row: number;
	col: number;
	item?: Item;
};

export class PositionStore implements Readable<Position> {
	#store: Writable<Position>;

	items: Readable<Item[]>;

	isDropping: Readable<boolean>;

	constructor(position: Position) {
		this.#store = writable(position);

		this.items = derived(this.#store, ($position) => {
			if ($position.item) return [$position.item];
			return [];
		});

		this.isDropping = derived(this.#store, ($position) => {
			return Boolean($position.item?.[SHADOW_ITEM_MARKER_PROPERTY_NAME]);
		});
	}

	subscribe = (
		run: Subscriber<Position>,
		invalidate?: Invalidator<Position> | undefined
	): Unsubscriber => {
		return this.#store.subscribe(run, invalidate);
	};

	placeItem = (item: Item): void => {
		this.#store.update((p) => {
			p.item = item;
			return p;
		});
	};
}
