function getFirstElement<T>(arr: T[]): T | undefined {
    return arr.length > 0 ? arr[0] : undefined;
}

const numbers: number[] = [10, 20, 30, 40, 50];
const firstNumber = getFirstElement(numbers);
console.log('Массив чисел:', numbers);
console.log('Первый элемент:', firstNumber);
console.log('Тип первого элемента:', typeof firstNumber);
console.log('---');

const strings: string[] = ['лимон', 'банан', 'картошка', 'груша'];
const firstString = getFirstElement(strings);
console.log('Массив строк:', strings);
console.log('Первый элемент:', firstString);
console.log('Тип первого элемента:', typeof firstString);
console.log('---');

const emptyArray: any[] = [];
const firstEmpty = getFirstElement(emptyArray);
console.log('Пустой массив:', emptyArray);
console.log('Первый элемент:', firstEmpty);
console.log('---');

interface Person {
    name: string;
    age: number;
}

const people: Person[] = [
    { name: 'Владимир', age: 20 },
    { name: 'Мария', age: 25 },
    { name: 'Евгений', age: 30 }
];

const firstPerson = getFirstElement(people);
console.log('Массив людей:', people);
console.log('Первый человек:', firstPerson);
console.log('Имя первого:', firstPerson?.name);
console.log('Возраст первого:', firstPerson?.age);