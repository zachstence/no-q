<script lang="ts">
	import Game from '$lib/Game.svelte';
	import { createGameStores } from '$lib/game-stores';

	const stores = createGameStores(['c', 'p', 'r', 'o', 'l', 'd', 'g', 'a', 'm', 'e', 's', 'y']);
</script>

<Game {stores} />
