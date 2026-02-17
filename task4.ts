type Status = 'active' | 'inactive' | 'new';

function getStatusColor(status: Status): string {
    switch (status) {
        case 'active':
            return 'green';
        case 'inactive':
            return 'black';
        case 'new':
            return 'white';
        default:
            const _exhaustiveCheck: never = status;
            return _exhaustiveCheck;
    }
}

console.log(`Статус 'active' -> цвет: ${getStatusColor('active')}`);
console.log(`Статус 'inactive' -> цвет: ${getStatusColor('inactive')}`);
console.log(`Статус 'new' -> цвет: ${getStatusColor('new')}`);
