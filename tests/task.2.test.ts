import { describe, it, expect } from 'vitest';
import { createBook } from '../src/task2.js';

describe('createBook', () => {
    it('Книга со всеми полями', () => {
        const book = {
            title: 'Война',
            author: 'Лев',
            year: 1938,
            genre: 'fiction' as const
        }

        const result = createBook(book);

        expect(result.title).toBe(book.title);
        expect(result.author).toBe(book.author);
        expect(result.year).toBe(book.year);
        expect(result.genre).toBe(book.genre);
    });

    it('Книга без года', () => {
    const book = {
        title: 'Война и мир',
        author: 'Лев Толстой',
        genre: 'fiction' as const
    };

    const result = createBook(book);

    expect(result.title).toBe(book.title);
    expect(result.author).toBe(book.author);
    expect(result.genre).toBe(book.genre);
    expect(result.year).toBeUndefined();
});
});