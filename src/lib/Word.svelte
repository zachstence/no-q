<script lang="ts">
	import type { WordStore } from './WordStore';

	export let word: WordStore;
	$: isValid = word.isValid;
	$: validChar = typeof $isValid === 'boolean' ? ($isValid ? '✅' : '❌') : ' ';
</script>

<tr class="mt-1">
	<td class="w-4 text-[16px] leading-none">{validChar}</td>
	<td>{word.word}</td>
</tr>
