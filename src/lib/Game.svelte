<script lang="ts">
	import Grid from './Grid.svelte';
	import type { GameStores } from './game-stores';

	export let stores: GameStores;

	$: words = stores.words;
	$: solved = stores.solved;
</script>

<div class="gao-4 flex flex-row">
	<div class="flex flex-col items-center gap-4">
		<Grid cells={stores.boardCells} />
		<Grid cells={stores.bankCells} />
	</div>
	<div class="flex flex-col">
		{#each $words as word}
			<span>{word}</span>
		{/each}
	</div>
</div>
