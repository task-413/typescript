import { describe, it, expect } from 'vitest';
import { firstUp, delSpaceAnduppercase } from '../src/task5.js';

describe('firstUp', () => {
    it('делает первую букву заглавной', () => {
        const result = firstUp('делает');
        expect(result).toBe('Делает');
    });

    it('возвращает пустую строку если входная строка пустая', () => {
        const result = firstUp('');
        expect(result).toBe('');
    });
});

describe('delSpaceAnduppercase', () => {
    it('убирает пробелы по краям', () => {
        const result = delSpaceAnduppercase(' делает ');
        expect(result).toBe('делает');
    });

    it('убирает пробелы и делает всю строку заглавной если uppercase=true', () => {
        const result = delSpaceAnduppercase(' делает ', true);
        expect(result).toBe('ДЕЛАЕТ');
    });
});