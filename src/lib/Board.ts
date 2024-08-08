type ArrayBoard = (string | undefined)[][];
type ObjectBoard = Record<number, Record<number, string>>;

export class Board {
	private arrayBoard: ArrayBoard;

	private objectBoard: ObjectBoard;

	constructor(board: ObjectBoard | ArrayBoard) {
		if (Array.isArray(board)) {
			this.arrayBoard = board;
			this.objectBoard = Board.arrayToObject(board);
		} else {
			this.objectBoard = board;
			this.arrayBoard = Board.objectToArray(board);
		}
	}

	asArray(): ArrayBoard {
		return this.arrayBoard;
	}

	asObject(): ObjectBoard {
		return this.objectBoard;
	}

	private static objectToArray(board: ObjectBoard): ArrayBoard {
		const numRows = Object.keys(board).length;
		const numCols = Math.max(...Object.values(board).map((row) => Object.keys(row).length));

		const arrayBoard = Array.from({ length: numRows }, () =>
			Array.from({ length: numCols }, () => undefined)
		) as ArrayBoard;

		for (let r = 0; r < numRows; r++) {
			for (let c = 0; c < numCols; c++) {
				arrayBoard[r][c] = board[r][c] ?? undefined;
			}
		}

		return arrayBoard;
	}

	private static arrayToObject(board: ArrayBoard): ObjectBoard {
		const objectBoard: ObjectBoard = {};

		for (let r = 0; r < board.length; r++) {
			for (let c = 0; c < board[r].length; c++) {
				if (typeof board[r][c] !== 'undefined') {
					objectBoard[r] ??= {};
					objectBoard[r][c] = board[r][c] as string;
				}
			}
		}

		return objectBoard;
	}
}
