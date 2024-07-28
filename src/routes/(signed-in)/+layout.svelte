<script lang="ts">
	import type { LayoutServerData } from './$types';
	import '../../app.css';

	export let data: LayoutServerData;

	console.log('Logged in as', data.user.username);
</script>

<slot></slot>
