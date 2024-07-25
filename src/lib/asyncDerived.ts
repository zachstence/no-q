import { derived, type Readable, type Stores, type StoresValues } from 'svelte/store';

export const asyncDerived = <S extends Stores, T>(
	stores: S,
	fn: (values: StoresValues<S>) => Promise<T>,
	initial_value?: T
): Readable<T> => {
	return derived(
		stores,
		($stores, set) => {
			fn($stores).then(set);
		},
		initial_value
	);
};
