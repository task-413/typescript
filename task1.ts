interface User {
    id: number;
    name: string;
    email?: string;
    isActive: boolean;
}

function createUser(id: number, name: string, email?: string): User {
    const user: User = {
        id: id,
        name: name,
        isActive: true
    };
    
    if (email) {
        user.email = email;
    }
    
    return user;
}

const user1 = createUser(1, 'Мартынов', 'martynovzahar7@gmail.com');

console.log('Пользователь 1:', user1);;