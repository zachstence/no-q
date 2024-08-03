<script lang="ts">
	import type { PageServerData } from './$types';
	import { formatRelative } from 'date-fns';
	import { IconArrowNarrowRight } from '@tabler/icons-svelte';

	export let data: PageServerData;
</script>

<h2 class="mb-2 text-xl font-bold">My Games</h2>
<div class="flex flex-col gap-2">
	{#each data.games as game (game.id)}
		<div class="bg-base-300 group flex flex-row items-center justify-between gap-4 rounded-md p-3">
			<div class="flex flex-col">
				<div class="font-display text-lg font-semibold uppercase tracking-widest">
					{game.roll.letters.join('')}
				</div>
				<div class="text-base-content/50 text-sm">
					{formatRelative(game.created_at, new Date())}
				</div>
			</div>
			<a class="btn btn-md btn-primary" href={`/play/${game.id}`}>Play <IconArrowNarrowRight /></a>
		</div>
	{/each}
</div>
