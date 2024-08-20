import { writable, type Readable } from 'svelte/store';

export type FetchStoreValue = {
	fetched?: boolean;
	fetching?: boolean;
	success?: boolean;
	lastSuccess?: Date;
	error?: unknown;
};

export class FetchStore<T = void> implements Readable<FetchStoreValue> {
	#store = writable<FetchStoreValue>({});

	constructor(private readonly execFunc: () => Promise<T>) {}

	subscribe = this.#store.subscribe;

	async exec(): Promise<T | undefined> {
		this.#store.update((v) => ({ ...v, fetching: true, success: undefined, error: undefined }));

		try {
			const result = await this.execFunc();
			this.#store.update((v) => ({ ...v, success: true, lastSuccess: new Date() }));
			return result;
		} catch (e) {
			this.#store.update((v) => ({ ...v, success: false, error: e }));
		} finally {
			this.#store.update((v) => ({ ...v, fetched: true, fetching: false }));
		}
	}
}
