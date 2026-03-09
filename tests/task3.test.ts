import { describe, it, expect } from 'vitest';
import { calculateArea } from '../src/task3.js';

describe('calculateArea', () => {
    it('считает площадь круга', () => {
        const result = calculateArea('circle', 5);
        expect(result).toBeCloseTo(78.54, 2);
});

    it('считает площадь квадрата', () => {
        const result = calculateArea('square', 5);
        expect(result).toBeCloseTo(25);
    });
});