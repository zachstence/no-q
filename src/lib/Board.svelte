<script lang="ts">
	import { flip } from 'svelte/animate';
	import { dndzone } from 'svelte-dnd-action';
	import { nanoid } from 'nanoid';

	import Letter from './Letter.svelte';

	export let letters: string[];

	type Item = {
		id: string;
		letter: string;
	};

	let items: Item[];
	$: items = letters.map((letter) => ({ id: nanoid(), letter }));

	const flipDurationMs = 150;
</script>

<div
	use:dndzone={{ items, flipDurationMs }}
	on:consider={(e) => (items = e.detail.items)}
	on:finalize={(e) => (items = e.detail.items)}
>
	{#each items as item (item.id)}
		<div animate:flip={{ duration: flipDurationMs }}>
			<Letter>{item.letter}</Letter>
		</div>
	{/each}
</div>
