<script lang="ts">
	import Game from '$lib/Game.svelte';
	import { createGameStores, type GameStores } from '$lib/game-stores';
	import { roll } from '$lib/roll';

	let stores: GameStores | undefined;

	const newGame = () => {
		const letters = roll();
		stores = createGameStores(letters);
	};
</script>

{#if stores}
	<Game {stores} />
{:else}
	<button on:click={newGame}>New Game</button>
{/if}
