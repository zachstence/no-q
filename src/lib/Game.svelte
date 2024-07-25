<script lang="ts">
	import Grid from './Grid.svelte';
	import type { GameStores } from './game-stores';

	export let stores: GameStores;

	$: validWords = stores.validWords;
</script>

<div class="gao-4 flex flex-row">
	<div class="flex flex-col items-center gap-4">
		<Grid cells={stores.board} />
		<Grid cells={stores.bank} />
	</div>
	<div class="flex flex-col">
		{#each $validWords as word}
			<span>{word}</span>
		{/each}
	</div>
</div>
