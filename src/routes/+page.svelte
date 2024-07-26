<script lang="ts">
	import Game from '$lib/Game.svelte';
	import { createGameStores, type GameStores } from '$lib/game-stores';
	import { onMount } from 'svelte';

	let stores: GameStores | undefined;
	onMount(() => {
		stores = createGameStores(['c', 'p', 'r', 'o', 'l', 'd', 'g', 'a', 'm', 'e', 's', 'y']);
	});
</script>

{#if stores}
	<Game {stores} />
{/if}
