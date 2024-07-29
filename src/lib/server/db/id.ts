import { generateIdFromEntropySize } from 'lucia';

export const id = (): string => generateIdFromEntropySize(10);
