<script lang="ts">
	import Grid from './Grid.svelte';
	import type { GameStores } from './game-stores';

	export let stores: GameStores;

	$: words = stores.words;
	$: solved = stores.solved;
</script>

<div class="gao-4 flex flex-row">
	<div class="flex flex-col items-center gap-4">
		<Grid cells={stores.board} />
		<Grid cells={stores.bank} />
	</div>
	<div class="flex flex-col">
		{#if $solved}
			<div class="text-2xl font-bold text-green-400">Solved!</div>
		{/if}
		{#each $words as word}
			<span>{word}</span>
		{/each}
	</div>
</div>
