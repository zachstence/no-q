import { derived, get, writable, type Readable } from 'svelte/store';
import type { CellStore } from './Cell.svelte';
import { nanoid } from 'nanoid';
import { check } from './check';
import { asyncDerived } from './asyncDerived';
import type { Item } from './item';
import type { DenseBoard } from './Board';

export type GameStores = {
	bankCells: CellStore[][];
	boardCells: CellStore[][];
	board: Readable<DenseBoard>;
	words: Readable<string[]>;
	solved: Readable<boolean>;
};

export const createGameStores = (letters: string[], savedBoard: DenseBoard): GameStores => {
	const items: Item[] = letters.map((letter) => ({ id: nanoid(), letter }));

	const bankCells: CellStore[][] = Array.from({ length: 2 }).map((_, r) =>
		Array.from({ length: 6 }).map((_, c) => writable(items[r * 6 + c]))
	);

	const boardCells: CellStore[][] = Array.from({ length: 12 }).map(() =>
		Array.from({ length: 12 }).map(() => writable(undefined))
	);

	// Move items from bankCells to boardCells based on savedBoard
	Object.entries(savedBoard).forEach(([r, row]) => {
		Object.entries(row).forEach(([c, letter]) => {
			const boardR = parseInt(r);
			const boardC = parseInt(c);

			const bankCoords = findIndex2D(bankCells, (cell) => get(cell)?.letter === letter);
			if (!bankCoords) {
				throw new Error(
					`savedBoard contains a letter '${letter}' at position ${boardR},${boardC} not in the bank`
				);
			}
			const { r: bankR, c: bankC } = bankCoords;

			const item = get(bankCells[bankR][bankC]);
			bankCells[bankR][bankC].set(undefined);
			boardCells[boardR][boardC].set(item);
		});
	});

	const board = derived(
		boardCells.flatMap((r) => r),
		($cells) => {
			return $cells.reduce<DenseBoard>((acc, cell, i) => {
				if (!cell) return acc;
				const r = Math.floor(i / 12);
				const c = i % 12;
				if (!acc[r]) acc[r] = {};
				acc[r][c] = cell?.letter;
				return acc;
			}, {});
		}
	);

	const wordsWithItems: Readable<{ word: string; items: Item[] }[]> = asyncDerived(
		boardCells.flatMap((row) => row),
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
		bankCells,
		boardCells,
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

const findIndex2D = <T = unknown>(
	arr: T[][],
	predicate: (value: T) => boolean
): { r: number; c: number } | undefined => {
	for (let r = 0; r < arr.length; r++) {
		const row = arr[r];
		for (let c = 0; c < row.length; c++) {
			const value = row[c];
			if (predicate(value)) {
				return { r, c };
			}
		}
	}
	return undefined;
};
