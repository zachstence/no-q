export type Item = Record<string, unknown> & {
	id: string;
	letter: string;
	row?: number;
	col?: number;
};
