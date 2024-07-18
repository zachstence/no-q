<script lang="ts">
	import { dndzone, SHADOW_ITEM_MARKER_PROPERTY_NAME } from 'svelte-dnd-action';
	import Letter from './Letter.svelte';

	export let flipDurationMs: number | undefined = undefined;

	let items: { id: string; letter: string }[] = [];

	$: isDropping = items.find((item: any) => item[SHADOW_ITEM_MARKER_PROPERTY_NAME]);
</script>

<div
	class="aspect-square h-16 w-16 rounded-md bg-gray-100 transition-colors duration-100"
	class:bg-gray-200={isDropping}
	use:dndzone={{
		items,
		flipDurationMs,
		dropFromOthersDisabled: items.length > 0,
		dropTargetStyle: {}
	}}
	on:consider={(e) => (items = e.detail.items)}
	on:finalize={(e) => (items = e.detail.items)}
>
	{#if items[0]}
		<Letter>{items[0].letter}</Letter>
	{/if}
</div>
