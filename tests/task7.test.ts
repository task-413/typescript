import { describe, it, expect } from 'vitest';
import { findById } from '../src/task7.js';

describe('findById', () => {
    it('находит пользователя по существующему id', () => {
        const users = [
            { id: 1, name: 'Петр Первый' },
            { id: 2, name: 'Первый Петр' },
            { id: 3, name: 'Петр Иванов' }
        ];

        const result = findById(users, 2);
        
        expect(result).toEqual({ id: 2, name: 'Первый Петр' });
    });

    it('находит продукт по существующему id', () => {
        const products = [
            { id: 101, title: 'Ноутбук', price: 65000 },
            { id: 102, title: 'Мышь', price: 2500 },
            { id: 103, title: 'Клавиатура', price: 3300 }
        ];

        const result = findById(products, 103);
        
        expect(result).toEqual({ id: 103, title: 'Клавиатура', price: 3300 });
    });

    it('возвращает undefined для несуществующего id', () => {
        const users = [
            { id: 1, name: 'Петр Первый' },
            { id: 2, name: 'Первый Петр' }
        ];

        const result = findById(users, 99);
        
        expect(result).toBeUndefined();
    });

    it('находит пользователя с email', () => {
        const users = [
            { id: 1, name: 'Петр Первый', email: 'petrpervui@mail.com' },
            { id: 2, name: 'Первый Петр' }
        ];

        const result = findById(users, 1);
        
        expect(result).toEqual({ 
            id: 1, 
            name: 'Петр Первый', 
            email: 'petrpervui@mail.com' 
        });
        expect(result?.email).toBe('petrpervui@mail.com');
    });

    it('работает с пустым массивом', () => {
        const empty: any[] = [];
        const result = findById(empty, 1);
        
        expect(result).toBeUndefined();
    });
});