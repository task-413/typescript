import { describe, it, expect } from 'vitest';
import { createUser } from '../src/task1.js';

describe('createUser', () => {
    it('Пользователь с email', () => {
        const id = 1;
        const name = "Мартынов";
        const email = "martynovzahar7@gmail.com";

        const result = createUser(id, name, email);

        expect(result.id).toBe(id);
        expect(result.name).toBe(name);
        expect(result.email).toBe(email);
        expect(result.isActive).toBe(true);
    });

    it('Пользователь без email', () => {
    const id = 2;
    const name = "Иван";
    
    const result = createUser(id, name);
    
    expect(result.id).toBe(id);
    expect(result.name).toBe(name);
    expect(result.isActive).toBe(true);
    expect(result.email).toBeUndefined();
});
});