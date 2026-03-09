import { describe, it, expect } from 'vitest';
import { getFirstElement } from '../src/task6.js';

describe('getFirstElement', () => {
    it('возвращает первый элемент для массива чисел', () => {
        const arr = [10, 20, 30];
        const result = getFirstElement(arr);
        expect(result).toBe(10);
    });

    it('возвращает первый элемент для массива строк', () => {
        const arr = ['лимон', 'банан', 'груша'];
        const result = getFirstElement(arr);
        expect(result).toBe('лимон');
    });

    it('возвращает первый элемент для массива объектов', () => {
        const arr = [
            { name: 'Владимир', age: 20 },
            { name: 'Мария', age: 25 }
        ];
        const result = getFirstElement(arr);
        expect(result).toEqual({ name: 'Владимир', age: 20 });
    });

    it('возвращает undefined для пустого массива', () => {
        const arr: any[] = [];
        const result = getFirstElement(arr);
        expect(result).toBeUndefined();
    });

    it('сохраняет тип элементов', () => {
        const arr = [10, 20, 30];
        const result = getFirstElement(arr);
        expect(typeof result).toBe('number');
    });
});