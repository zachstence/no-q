<script lang="ts">
	import Board from '$lib/Board.svelte';

	const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
</script>

<div class="flex h-screen w-screen items-center justify-center">
	<Board {letters} />
</div>
