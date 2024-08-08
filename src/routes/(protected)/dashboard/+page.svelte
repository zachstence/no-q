<script lang="ts">
	import type { PageServerData } from './$types';
	import { formatRelative } from 'date-fns';
	import { IconArrowNarrowRight } from '@tabler/icons-svelte';

	export let data: PageServerData;
</script>

<h2 class="mb-2 text-xl font-bold">My Games</h2>
<div class="flex flex-col gap-2">
	{#each data.games as game (game.id)}
		<div class="group flex flex-row items-center justify-between gap-4 rounded-md bg-base-300 p-3">
			<div class="flex flex-col">
				<div class="font-display text-lg font-semibold uppercase tracking-widest">
					{game.roll.letters.join('')}
				</div>
				<div class="text-sm text-base-content/50">
					{formatRelative(game.created_at, new Date())}
				</div>
			</div>
			<a class="btn btn-primary btn-md" href={`/play/${game.id}`}
				>Continue <IconArrowNarrowRight /></a
			>
		</div>
	{/each}
</div>

<form method="POST" action="?/play">
	<button type="submit" class="btn btn-primary btn-md">New Game</button>
</form>
