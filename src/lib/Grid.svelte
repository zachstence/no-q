<script lang="ts">
	import Cell, { type CellStore } from './Cell.svelte';

	let clazz = '';
	export { clazz as class };

	export let cells: CellStore[][];

	$: rows = cells.length;
	$: cols = cells[0].length;
</script>

<div
	class="h-fit w-fit {clazz} grid gap-1"
	style="grid-template: repeat({rows}, 1fr) / repeat({cols}, 1fr);"
>
	{#each cells as row}
		{#each row as cell}
			<Cell {cell} />
		{/each}
	{/each}
</div>
