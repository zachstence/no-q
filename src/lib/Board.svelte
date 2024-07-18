<script lang="ts">
	import { nanoid } from 'nanoid';

	import Position from './Position.svelte';
	import { dndzone, type DndEvent } from 'svelte-dnd-action';
	import { flip } from 'svelte/animate';
	import Letter from './Letter.svelte';
	import { writable } from 'svelte/store';

	export let letters: string[];

	type Item = {
		id: string;
		letter: string;
	};

	const bank = writable<Item[]>(letters.map((letter) => ({ id: nanoid(), letter })));

	const flipDurationMs = 150;

	const shuffleBank = (): void => {
		$bank = $bank.sort(() => Math.random() - 0.5);
	};

	const onConsiderOrFinalize = (e: CustomEvent<DndEvent<Item>>) => {
		$bank = e.detail.items;
	};

	$: console.log(`bank: ${$bank.map((item) => item.letter).join(' ')}`);
</script>

<div class="flex flex-col items-center gap-6">
	<!-- Grid -->
	<div class="grid h-fit w-fit grid-cols-12 grid-rows-12 gap-1">
		{#each Array.from({ length: 12 }) as _}
			{#each Array.from({ length: 12 }) as _}
				<Position {flipDurationMs} />
			{/each}
		{/each}
	</div>

	<!-- Bank -->
	<div class="grid w-full grid-cols-3">
		<div />
		<div
			class="grid h-fit w-fit grid-cols-6 grid-rows-2 gap-1 place-self-center rounded-lg bg-gray-100 p-4"
			use:dndzone={{ items: $bank, flipDurationMs, dropTargetStyle: {} }}
			on:consider={onConsiderOrFinalize}
			on:finalize={onConsiderOrFinalize}
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
