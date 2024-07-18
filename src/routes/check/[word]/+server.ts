import type { RequestHandler } from './$types';
import { dictionaries } from '@scrabble-solver/dictionaries';
import ScrabbleSolverTypes from '@scrabble-solver/types';

export const GET: RequestHandler = async ({ params }) => {
	const trie = await dictionaries.get(ScrabbleSolverTypes.Locale.EN_US);
	const valid = trie.has(params.word);
	return new Response(JSON.stringify({ valid }));
};
