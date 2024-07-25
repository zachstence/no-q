const cache: Record<string, boolean> = {};

export const check = async (word: string): Promise<boolean> => {
	if (typeof cache[word] !== 'undefined') {
		return cache[word];
	}

	const response = await fetch(`/check/${word}`);
	const { isValid } = await response.json();

	cache[word] = isValid;

	return isValid;
};
