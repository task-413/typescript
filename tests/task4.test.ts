import { describe, it, expect } from 'vitest';
import { where, sort, groupBy, having, query } from '../src/task4.js';

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
  it('should filter and sort users', () => {
    const pipeline = query<User>(
      where<User, 'name'>('name', 'John'),
      where<User, 'surname'>('surname', 'Doe'),
      sort<User, 'age'>('age')
    );

    const result = pipeline(users) as User[];
    expect(result).toEqual([
      { id: 2, name: 'John', surname: 'Doe', age: 33, city: 'NY' },
      { id: 1, name: 'John', surname: 'Doe', age: 34, city: 'NY' },
      { id: 3, name: 'John', surname: 'Doe', age: 35, city: 'LA' }
    ]);
  });

  it('should group by city and filter groups having more than one item', () => {
    const pipeline = query<User>(
      groupBy<User, 'city'>('city'),
      having<User, 'city'>(group => group.items.length > 1)
    );

    const result = pipeline(users) as { key: string; items: User[] }[];
    expect(result).toEqual([
      {
        key: 'NY',
        items: [
          { id: 1, name: 'John', surname: 'Doe', age: 34, city: 'NY' },
          { id: 2, name: 'John', surname: 'Doe', age: 33, city: 'NY' }
        ]
      },
      {
        key: 'LA',
        items: [
          { id: 3, name: 'John', surname: 'Doe', age: 35, city: 'LA' },
          { id: 4, name: 'Mike', surname: 'Doe', age: 35, city: 'LA' }
        ]
      }
    ]);
  });

  it('should combine where, groupBy and having', () => {
    const pipeline = query<User>(
      where<User, 'surname'>('surname', 'Doe'),
      groupBy<User, 'city'>('city'),
      having<User, 'city'>(group => 
        group.items.some(user => user.age > 34)
      )
    );

    const result = pipeline(users) as { key: string; items: User[] }[];
    expect(result).toEqual([
      {
        key: 'LA',
        items: [
          { id: 3, name: 'John', surname: 'Doe', age: 35, city: 'LA' },
          { id: 4, name: 'Mike', surname: 'Doe', age: 35, city: 'LA' }
        ]
      }
    ]);
  });
});