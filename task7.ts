interface HasId {
    id: number;
}

function findById<T extends HasId>(items: T[], id: number): T | undefined {
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item && item.id === id) {
            return item;
        }
    }
    return undefined;
}

interface User {
    id: number;
    name: string;
    email?: string;
}

interface Product {
    id: number;
    title: string;
    price: number;
}

const users: User[] = [
    { id: 1, name: 'Петр Первый', email: 'petrpervui@mail.com' },
    { id: 2, name: 'Первый Петр', email: 'pervuipetr@mail.com' },
    { id: 3, name: 'Петр Иванов' }
];

const products: Product[] = [
    { id: 101, title: 'Ноутбук', price: 65000 },
    { id: 102, title: 'Мышь', price: 2500 },
    { id: 103, title: 'Клавиатура', price: 3300 }
];

const foundUser = findById(users, 2);
if (foundUser) {
    console.log('Найденный пользователь (id=2):', foundUser);
}

const foundProduct = findById(products, 103);
if (foundProduct) {
    console.log('Найденный продукт (id=103):', foundProduct);
}

const notFound = findById(users, 99);
if (!notFound) {
    console.log('Пользователь с id=99 не найден (ожидаемо)');
}

const foundUserWithEmail = findById(users, 1);
if (foundUserWithEmail) {
    console.log('Email пользователя с id=1:', foundUserWithEmail.email);
}