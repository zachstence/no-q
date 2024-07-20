<script lang="ts">
	import Cell, { type CellStore } from './Cell.svelte';

	let clazz = '';
	export { clazz as class };

	export let cells: CellStore[][];

	$: d = cells.length;
</script>

<div
	class="h-full w-full {clazz} grid gap-1"
	style="grid-template: repeat({d}, 1fr) / repeat({d}, 1fr);"
>
	{#each cells as row}
		{#each row as cell}
			<Cell {cell} />
		{/each}
	{/each}
</div>
