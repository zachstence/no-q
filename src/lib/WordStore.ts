import { readonly, writable, type Readable } from 'svelte/store';

export class WordStore {
	constructor(readonly word: string) {
		WordStore.check(word).then((isValid) => this.#isValid.set(isValid));
	}

	#isValid = writable<boolean | undefined>(undefined);

	get isValid(): Readable<boolean | undefined> {
		return readonly(this.#isValid);
	}

	static #cache: Record<string, boolean> = {};

	static check = async (word: string): Promise<boolean> => {
		if (typeof WordStore.#cache[word] !== 'undefined') {
			return WordStore.#cache[word];
		}

		const response = await fetch(`/check/${word}`);
		const { isValid } = await response.json();
		WordStore.#cache[word] = isValid;

		return isValid;
	};
}
