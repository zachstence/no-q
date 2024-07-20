import type { PositionStore } from './Position.store';

export type PositionGrid = {
	[row: number]: {
		[col: number]: PositionStore;
	};
};
