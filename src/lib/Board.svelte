<script lang="ts">
	import { nanoid } from 'nanoid';

	import Position from './Position.svelte';
	import { dndzone } from 'svelte-dnd-action';
	import { flip } from 'svelte/animate';
	import Letter from './Letter.svelte';
	import { derived, writable } from 'svelte/store';
	import type { Item } from './item';

	export let letters: string[];

	const bank = writable<Item[]>(letters.map((letter) => ({ id: nanoid(), letter })));
	type Board = {
		[row: number]: {
			[col: number]: Item;
		};
	};

	type PositionStoreValue = {
		row: number;
		col: number;
		item?: Item;
	};
	const createPositionStore = (row: number, col: number) =>
		writable<PositionStoreValue>({ row, col });

	const positionStores = Array.from({ length: 12 }).flatMap((_, r) =>
		Array.from({ length: 12 }).map((_, c) => createPositionStore(r, c))
	);

	const board = derived(positionStores, ($positionStores) => {
		const board: Board = {};
		$positionStores.forEach((p) => {
			if (!p.item) return;
			if (!board[p.row]) board[p.row] = {};
			board[p.row][p.col] = p.item;
		});
		return board;
	});

	const flipDurationMs = 150;

	const shuffleBank = (): void => {
		$bank = $bank.sort(() => Math.random() - 0.5);
	};

	$: console.log({ bank: $bank });
	$: console.log({ board: $board });
</script>

<div class="flex flex-col items-center gap-6">
	<!-- Grid -->
	<div class="grid h-fit w-fit grid-cols-12 grid-rows-12 gap-1">
		{#each positionStores as position}
			<Position {flipDurationMs} {position} />
		{/each}
	</div>

	<!-- Bank -->
	<div class="grid w-full grid-cols-3">
		<div />
		<div
			class="grid h-fit w-fit grid-cols-6 grid-rows-2 gap-1 place-self-center rounded-lg bg-gray-100 p-4"
			use:dndzone={{ items: $bank, flipDurationMs, dropTargetStyle: {} }}
			on:consider={(e) => ($bank = e.detail.items)}
			on:finalize={(e) => ($bank = e.detail.items)}
		>
			{#each $bank as item (item.id)}
				<div animate:flip={{ duration: flipDurationMs }}>
					<Letter>{item.letter}</Letter>
				</div>
			{/each}
		</div>

		<button
			class="place-self-start self-center rounded-md bg-gray-100 px-4 py-2 transition-colors hover:bg-gray-200 active:bg-gray-300"
			on:click={shuffleBank}>Shuffle</button
		>
	</div>
</div>
