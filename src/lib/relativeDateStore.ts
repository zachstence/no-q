import { formatDistanceToNow } from 'date-fns';
import { readonly, writable, type Readable } from 'svelte/store';

export const createRelativeDateStore = (
	date: Date,
	opts = { intervalMs: 1000 }
): Readable<string> => {
	const store = writable<string>(format(date), () => () => {
		clearInterval(interval);
	});

	const interval = setInterval(() => {
		store.set(format(date));
	}, opts.intervalMs);

	return readonly(store);
};

const format = (date: Date): string => {
	const result = formatDistanceToNow(date, { addSuffix: true });
	if (result === 'less than a minute ago') return 'just now';
	return result;
};
