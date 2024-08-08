import { z } from 'zod';

const SparseBoardSchema = z.array(z.array(z.string().length(1).optional()));
export type SparseBoard = z.infer<typeof SparseBoardSchema>;
export const isSparseBoard = (board: unknown): board is SparseBoard =>
	SparseBoardSchema.safeParse(board).success;

const IntegerStringSchema = z.coerce.number().int().nonnegative();
export const DenseBoardSchema = z.record(
	IntegerStringSchema,
	z.record(IntegerStringSchema, z.string().length(1))
);
type DenseBoard = z.infer<typeof DenseBoardSchema>;
export const isDenseBoard = (board: unknown): board is DenseBoard =>
	DenseBoardSchema.safeParse(board).success;

export const toSparse = (board: DenseBoard | SparseBoard): SparseBoard => {
	if (isSparseBoard(board)) return board;
	if (isDenseBoard(board)) return denseToSparse(board);
	return [];
};

export const toDense = (board: DenseBoard | SparseBoard): DenseBoard => {
	if (isDenseBoard(board)) return board;
	if (isSparseBoard(board)) return sparseToDense(board);
	return {};
};

export const shiftDense = (board: DenseBoard): DenseBoard => {
	const rows = Object.keys(board).map(Number);
	const cols = rows.flatMap((row) => Object.keys(board[row]).map(Number));

	const minRow = Math.min(...rows);
	const minCol = Math.min(...cols);

	const shifted: DenseBoard = {};

	for (const row of rows) {
		const newRow = row - minRow;
		for (const col of cols) {
			const newCol = col - minCol;
			shifted[newRow] ??= {};
			shifted[newRow][newCol] = board[row][col];
		}
	}

	return shifted;
};

const denseToSparse = (dense: DenseBoard): SparseBoard => {
	const numRows = Object.keys(dense).length;
	const numCols = Math.max(...Object.values(dense).map((row) => Object.keys(row).length));

	const sparse = Array.from({ length: numRows }, () =>
		Array.from({ length: numCols }, () => undefined)
	) as SparseBoard;

	for (let r = 0; r < numRows; r++) {
		for (let c = 0; c < numCols; c++) {
			sparse[r][c] = dense[r][c] ?? undefined;
		}
	}

	return sparse;
};

const sparseToDense = (sparse: SparseBoard): DenseBoard => {
	const dense: DenseBoard = {};

	for (let r = 0; r < sparse.length; r++) {
		for (let c = 0; c < sparse[r].length; c++) {
			if (typeof sparse[r][c] !== 'undefined') {
				dense[r] ??= {};
				dense[r][c] = sparse[r][c] as string;
			}
		}
	}

	return shiftDense(dense);
};
