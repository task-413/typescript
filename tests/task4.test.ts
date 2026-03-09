import { describe, it, expect } from 'vitest';
import { getStatusColor } from '../src/task4.js';

describe('getStatusColor', () => {
    it('возвращает green для active', () => {
        const result = getStatusColor('active');
        expect(result).toBe('green');
    });

    it('возвращает black для inactive', () => {
        const result = getStatusColor('inactive');
        expect(result).toBe('black');
    });

    it('возвращает white для new', () => {
        const result = getStatusColor('new');
        expect(result).toBe('white');
    });
});