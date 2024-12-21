<script lang="ts">
	import { IconCheck, IconX } from '@tabler/icons-svelte';
	import type { PageServerData } from './$types';
	import Game from '$lib/Game.svelte';
	import { createGameStores } from '$lib/game-stores';
	import { toDense } from '$lib/Board';
	import { get } from 'svelte/store';
	import { FetchStore } from '$lib/fetch-store';
	import FetchStoreStatus from '$lib/FetchStoreStatus.svelte';

	export let data: PageServerData;

	$: stores = createGameStores(data.game.roll.letters, data.game.board ?? {});
	$: solved = stores.solved;
	$: board = stores.board;

	let saveSolutionStatus: 'success' | 'error' | undefined;
	const saveSolution = async (): Promise<void> => {
		const response = await fetch(`/api/games/${data.game.id}/solve`, {
			method: 'POST',
			body: JSON.stringify($board)
		});
		saveSolutionStatus = response.ok ? 'success' : 'error';
	};

	let dialog: HTMLDialogElement;
	$: if ($solved) {
		dialog.showModal();
		saveSolution();
	}

	const saveBoard = new FetchStore(async () => {
		await fetch(`/api/games/${data.game.id}`, {
			method: 'PATCH',
			body: JSON.stringify($board)
		});
	});

	$: $board, saveBoard.exec();
</script>

<FetchStoreStatus
	store={saveBoard}
	loading="Saving..."
	success="Game saved"
	error="Failed to save game"
/>

<Game {stores} />

<dialog bind:this={dialog} id="solved-modal" class="modal">
	<div class="modal-box flex flex-col items-center">
		<div class="text-2xl font-bold text-success">Solved!</div>
		{#if saveSolutionStatus === 'success'}
			<span class="text-success"><IconCheck /> Saved</span>
		{:else if saveSolutionStatus === 'error'}
			<span class="text-error"><IconX />Error</span>
		{:else}
			<span class="flex flex-row items-center gap-2 text-base-content/50">
				<span class="loading loading-spinner loading-sm" />
				Saving
			</span>
		{/if}

		<button>Solve Again</button>
		<button>New Roll</button>
		<a href="/dashboard">Dashboard</a>
		<button>Screenshot</button>
	</div>
</dialog>
