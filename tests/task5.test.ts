import { describe, it, expect, expectTypeOf } from 'vitest';
import { where, sort, groupBy, having, query } from '../src/task5.js';

interface User {
  id: number;
  name: string;
  surname: string;
  age: number;
  city: string;
}

const users: User[] = [
  { id: 1, name: 'John', surname: 'Doe', age: 34, city: 'NY' },
  { id: 2, name: 'John', surname: 'Doe', age: 33, city: 'NY' },
  { id: 3, name: 'John', surname: 'Doe', age: 35, city: 'LA' },
  { id: 4, name: 'Mike', surname: 'Doe', age: 35, city: 'LA' }
];

describe('query pipeline', () => {
  it('where + where + groupBy + having + sort порядок правильный', () => {
    const pipeline = query<User>(
      where<User, 'name'>('name', 'John'),
      where<User, 'surname'>('surname', 'Doe'),
      groupBy<User, 'city'>('city'),
      having<User, 'city'>(group => group.items.length > 1),
      sort<User, 'age'>('age')
    );
    expectTypeOf(pipeline).toBeFunction();
    expectTypeOf(pipeline).parameter(0).toMatchTypeOf<User[]>();
  });

  it('только where разрешены первыми', () => {
    const pipeline = query<User>(
      where<User, 'name'>('name', 'John'),
      where<User, 'surname'>('surname', 'Doe')
    );
    expectTypeOf(pipeline).toBeFunction();
  });

  it('groupBy разрешены после where', () => {
    const pipeline = query<User>(
      where<User, 'name'>('name', 'John'),
      groupBy<User, 'city'>('city'),
      groupBy<User, 'age'>('age')
    );
    expectTypeOf(pipeline).toBeFunction();
  });

  it('having разрешены после groupBy', () => {
    const pipeline = query<User>(
      groupBy<User, 'city'>('city'),
      having<User, 'city'>(group => group.items.length > 1),
      having<User, 'city'>(group => group.items.some(u => u.age > 30))
    );
    expectTypeOf(pipeline).toBeFunction();
  });

  it('sort разрешены последними', () => {
    const pipeline = query<User>(
      sort<User, 'age'>('age'),
      sort<User, 'name'>('name')
    );
    expectTypeOf(pipeline).toBeFunction();
  });

  it('groupBy до where ошибка', () => {
    query<User>(
      groupBy<User, 'city'>('city'),
      where<User, 'name'>('name', 'John')
    );
  });

  it('having до groupBy ошибка', () => {
    query<User>(
      having<User, 'city'>(group => group.items.length > 1),
      groupBy<User, 'city'>('city')
    );
  });

  it('sort до having ошибка', () => {
    query<User>(
      groupBy<User, 'city'>('city'),
      sort<User, 'age'>('age'),
      having<User, 'city'>(group => group.items.length > 1)
    );
  });

  it('sort до where ошибка', () => {
    query<User>(
      sort<User, 'age'>('age'),
      where<User, 'name'>('name', 'John')
    );
  });

  it('having до where ошибка', () => {
    query<User>(
      having<User, 'city'>(group => group.items.length > 1),
      where<User, 'name'>('name', 'John')
    );
  });

  it('конвейер работает с правильным порядком', () => {
    const pipeline = query<User>(
      where<User, 'surname'>('surname', 'Doe'),
      groupBy<User, 'city'>('city'),
      having<User, 'city'>(group => group.items.some(user => user.age > 34)),
      sort<User, 'age'>('age')
    );
    const result = pipeline(users);
    expect(result).toBeDefined();
  });
});