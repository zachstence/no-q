<script lang="ts">
	import { BoardStore } from '$lib/Board.store';
	import Board from '$lib/Board.svelte';

	const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

	const store = new BoardStore(letters);
</script>

<div class="flex h-screen w-screen items-center justify-center">
	<Board {store} />
</div>
