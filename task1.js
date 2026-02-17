function createUser(id, name, email) {
    var user = {
        id: id,
        name: name,
        isActive: true
    };
    if (email) {
        user.email = email;
    }
    return user;
}
var user1 = createUser(1, 'Мартынов', 'martynovzahar7@gmail.com');
console.log('Пользователь 1:', user1);
;
