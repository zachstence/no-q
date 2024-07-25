import type { RequestHandler } from './$types';
import { dictionaries } from '@scrabble-solver/dictionaries';
import ScrabbleSolverTypes from '@scrabble-solver/types';

export const GET: RequestHandler = async ({ params: { word } }) => {
	const trie = await dictionaries.get(ScrabbleSolverTypes.Locale.EN_US);
	const isValid = trie.has(word.toLowerCase());
	return new Response(JSON.stringify({ isValid }));
};
