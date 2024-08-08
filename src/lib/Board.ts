import { z } from 'zod';

const SparseBoardSchema = z.array(z.array(z.string().length(1).optional()));
type SparseBoard = z.infer<typeof SparseBoardSchema>;
const isSparseBoard = (board: unknown): board is SparseBoard =>
	SparseBoardSchema.safeParse(board).success;

const IntegerStringSchema = z.coerce.number().int().nonnegative();
const DenseBoardSchema = z.record(
	IntegerStringSchema,
	z.record(IntegerStringSchema, z.string().length(1))
);
type DenseBoard = z.infer<typeof DenseBoardSchema>;
const isDenseBoard = (board: unknown): board is DenseBoard =>
	DenseBoardSchema.safeParse(board).success;

export class Board {
	#sparse?: SparseBoard;

	#dense?: DenseBoard;

	get sprarse(): SparseBoard {
		if (!this.#sparse) {
			this.#sparse = Board.denseToSparse(this.#dense!);
		}
		return this.#sparse;
	}

	get dense(): DenseBoard {
		if (!this.#dense) {
			this.#dense = Board.sparseToDense(this.#sparse!);
		}
		return this.#dense;
	}

	private constructor(board: DenseBoard | SparseBoard) {
		if (isSparseBoard(board)) {
			this.#sparse = board;
		} else if (isDenseBoard(board)) {
			this.#dense = board;
		} else {
			throw new Error('Invalid board');
		}
	}

	static create(board: unknown): Board | undefined {
		try {
			return new Board(board as DenseBoard | SparseBoard);
		} catch (e) {
			console.error('Cant create board', {
				e,
				board,
				sparseError: SparseBoardSchema.safeParse(board).error,
				denseError: DenseBoardSchema.safeParse(board).error
			});
		}
	}

	private static denseToSparse(dense: DenseBoard): SparseBoard {
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
	}

	private static sparseToDense(sparse: SparseBoard): DenseBoard {
		const dense: DenseBoard = {};

		for (let r = 0; r < sparse.length; r++) {
			for (let c = 0; c < sparse[r].length; c++) {
				if (typeof sparse[r][c] !== 'undefined') {
					dense[r] ??= {};
					dense[r][c] = sparse[r][c] as string;
				}
			}
		}

		return dense;
	}
}
