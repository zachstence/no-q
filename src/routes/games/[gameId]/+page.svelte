<script lang="ts">
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<dl class="flex flex-col gap-2 font-mono">
	{#each Object.entries(data.game) as [key, value]}
		<div>
			<dt class="font-bold">{key}</dt>
			<dd class="ml-4">{value}</dd>
		</div>
	{/each}
</dl>
