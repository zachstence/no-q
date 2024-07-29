const DICE: [string, string, string, string, string, string][] = [
	['c', 'm', 't', 's', 't', 'c'],
	['c', 't', 'b', 'c', 'd', 'j'],
	['h', 'h', 'p', 't', 'w', 't'],
	['b', 'l', 'm', 'm', 'y', 'l'],
	['l', 'w', 'f', 'l', 'r', 'd'],
	['p', 'v', 'p', 'g', 'f', 'k'],
	['a', 'o', 'u', 'u', 'i', 'e'],
	['h', 'r', 'n', 'r', 'h', 'n'],
	['g', 'r', 'g', 'l', 'd', 'r'],
	['x', 'z', 'b', 'n', 'k', 's'],
	['e', 'a', 'e', 'o', 'o', 'a'],
	['y', 'n', 'i', 'n', 'o', 'i']
];

export const rollLetters = (): string[] =>
	DICE.reduce<string[]>((acc, die) => {
		acc.push(die[Math.floor(Math.random() * 6)]);
		return acc;
	}, []);
