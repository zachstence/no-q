<script lang="ts">
	import Position from './Position.svelte';
	import { dndzone } from 'svelte-dnd-action';
	import { flip } from 'svelte/animate';
	import Letter from './Letter.svelte';
	import { BoardStore } from './Board.store';

	let clazz = '';
	export { clazz as class };

	export let store: BoardStore;

	const { bank, positions, shuffleBank } = store;

	const flipDurationMs = 150;
</script>

<div class="{clazz} flex flex-col items-center gap-6">
	<!-- Grid -->
	<div class="grid h-fit w-fit grid-cols-12 grid-rows-12 gap-1">
		{#each positions as position}
			<Position {flipDurationMs} {position} />
		{/each}
	</div>

	<!-- Bank -->
	<div class="grid w-full grid-cols-3 gap-4">
		<div />
		<div
			class="grid h-fit w-fit grid-cols-6 grid-rows-2 gap-1 place-self-center rounded-lg bg-stone-900 p-2"
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
			class="place-self-start self-center rounded-md bg-stone-800 px-4 py-2 transition-colors hover:bg-stone-700 active:bg-stone-800"
			on:click={shuffleBank}>Shuffle</button
		>
	</div>
</div>
