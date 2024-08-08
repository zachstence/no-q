<script lang="ts">
	import { IconCheck, IconX } from '@tabler/icons-svelte';
	import type { PageServerData } from './$types';
	import Game from '$lib/Game.svelte';
	import { createGameStores } from '$lib/game-stores';
	import { toDense } from '$lib/Board';
	import { get } from 'svelte/store';

	export let data: PageServerData;

	$: stores = createGameStores(data.game.roll.letters);
	$: solved = stores.solved;
	$: board = stores.board;

	let saveStatus: 'success' | 'error' | undefined;
	const saveResult = async (): Promise<void> => {
		const body = toDense(board.map((r) => r.map((i) => get(i)?.letter)));
		const response = await fetch(`/api/games/${data.game.id}/solve`, {
			method: 'POST',
			body: JSON.stringify(body)
		});
		saveStatus = response.ok ? 'success' : 'error';
	};

	let dialog: HTMLDialogElement;
	$: if ($solved) {
		dialog.showModal();
		saveResult();
	}
</script>

<Game {stores} />

<dialog bind:this={dialog} id="solved-modal" class="modal">
	<div class="modal-box flex flex-col items-center">
		<div class="text-2xl font-bold text-success">Solved!</div>
		{#if saveStatus === 'success'}
			<span class="text-success"><IconCheck /> Saved</span>
		{:else if saveStatus === 'error'}
			<span class="text-error"><IconX />Error</span>
		{:else}
			<span class="flex flex-row items-center gap-2 text-base-content/50">
				<span class="loading loading-spinner loading-sm" />
				Saving
			</span>
		{/if}

		<button>Solve Again</button>
		<button>New Roll</button>
		<button>Dashboard</button>
		<button>Screenshot</button>
	</div>
</dialog>
