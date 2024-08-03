<script lang="ts">
	import type { PageServerData } from './$types';
	import Game from '$lib/Game.svelte';
	import { createGameStores } from '$lib/game-stores';

	export let data: PageServerData;

	$: stores = createGameStores(data.game.roll.letters);
</script>

<Game {stores} />
