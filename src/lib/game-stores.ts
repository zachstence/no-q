import { derived, writable, type Readable } from 'svelte/store';
import type { CellStore } from './Cell.svelte';
import { nanoid } from 'nanoid';
import { check } from './check';
import { asyncDerived } from './asyncDerived';
import type { Item } from './item';

export type GameStores = {
	bank: CellStore[][];
	board: CellStore[][];
	words: Readable<string[]>;
	solved: Readable<boolean>;
};

export const createGameStores = (letters: string[]): GameStores => {
	const items: Item[] = letters.map((letter) => ({ id: nanoid(), letter }));

	const bank: CellStore[][] = Array.from({ length: 2 }).map((_, r) =>
		Array.from({ length: 6 }).map((_, c) => writable(items[r * 6 + c]))
	);

	const board: CellStore[][] = Array.from({ length: 12 }).map(() =>
		Array.from({ length: 12 }).map(() => writable(undefined))
	);

	const wordsWithItems: Readable<{ word: string; items: Item[] }[]> = asyncDerived(
		board.flatMap((row) => row),
		async ($cells) => {
			const groupedItems: Item[][] = [];

			for (let r = 0; r < 12; r++) {
				const row = $cells.filter((_, i) => Math.floor(i / 12) === r);
				const rowGroups = groupItems(row);
				groupedItems.push(...rowGroups);
			}

			for (let c = 0; c < 12; c++) {
				const col = $cells.filter((_, i) => i % 12 === c);
				const colGroups = groupItems(col);
				groupedItems.push(...colGroups);
			}

			const groups = groupedItems.map((group) => ({
				word: group.map(({ letter }) => letter).join(''),
				items: group
			}));

			const groupsWithValid = await Promise.all(
				Array.from(groups)
					.filter((group) => group.word.length > 2)
					.map(async (group) => [group, await check(group.word)] as const)
			);

			const validGroups = groupsWithValid.filter(([, valid]) => valid).map(([word]) => word);
			return validGroups;
		},
		[]
	);

	const words: Readable<string[]> = derived(wordsWithItems, ($wordsWithItems) =>
		$wordsWithItems.map(({ word }) => word)
	);

	const usedItems: Readable<Set<Item>> = derived(wordsWithItems, ($wordsWithItems) => {
		const items = $wordsWithItems.flatMap(({ items }) => items);
		return new Set(items);
	});

	const allItemsUsed: Readable<boolean> = derived(usedItems, ($usedItems) => {
		return items.every((item) => $usedItems.has(item));
	});

	const allWordsConnected: Readable<boolean> = derived(wordsWithItems, ($wordsWithItems) => {
		return $wordsWithItems.every((a) => {
			const itemsIntersectWithSomeOtherItems = $wordsWithItems.some((b) => {
				if (a === b) return false;
				return a.items.some((item) => b.items.includes(item));
			});
			return itemsIntersectWithSomeOtherItems;
		});
	});

	const solved = derived(
		[allItemsUsed, allWordsConnected],
		([$allItemsUsed, $allWordsConnected]) => $allItemsUsed && $allWordsConnected
	);

	return {
		bank,
		board,
		words,
		solved
	};
};

const groupItems = (items: (Item | undefined)[]): Item[][] => {
	return items.reduce<Item[][]>(
		(acc, item) => {
			const lastGroup = acc[acc.length - 1];
			if (typeof item !== 'undefined') {
				lastGroup.push(item);
			} else if (lastGroup.length > 0) {
				acc.push([]);
			}
			return acc;
		},
		[[]]
	);
};
