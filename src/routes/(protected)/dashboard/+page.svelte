<script lang="ts">
	import type { PageServerData } from './$types';
	import { formatRelative } from 'date-fns';
	import { IconArrowNarrowRight } from '@tabler/icons-svelte';

	export let data: PageServerData;
</script>

<h2 class="mb-2 text-lg font-bold">My Games</h2>
<div class="flex flex-col gap-2">
	{#each data.games as game (game.id)}
		<div class="group flex flex-row items-center justify-between gap-4 bg-neutral-800 px-3 py-1">
			<div class="flex flex-col">
				<div class="font-display font-semibold uppercase tracking-widest text-neutral-100">
					{game.roll.letters.join('')}
				</div>
				<div class="text-neutral-500">{formatRelative(game.created_at, new Date())}</div>
			</div>
			<a
				class="flex flex-row items-center gap-2 rounded-md bg-neutral-700 px-3 py-1.5 transition-all hover:bg-neutral-600 active:bg-neutral-700/80 group-hover:opacity-100"
				href={`/play/${game.id}`}>Play <IconArrowNarrowRight /></a
			>
		</div>
	{/each}
</div>
