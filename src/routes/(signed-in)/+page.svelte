<script lang="ts">
	import { enhance } from '$app/forms';
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

<form method="post" use:enhance>
	<button type="submit">Sign Out</button>
</form>
