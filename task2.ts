type Genre = 'fiction' | 'non-fiction';

interface Book {
    title: string;
    author: string;
    year?: number;
    genre: Genre;
}


function createBook(book: Book): Book {
    return book;
}

const book1: Book = {
    title: 'Война и мир',
    author: 'Лев Толстой',
    year: 1869,
    genre: 'fiction'
};

const book2: Book = {
    title: 'Первая научная история войны 1812 года',
    author: 'Евгений Понасенков',
    genre: 'non-fiction'
};


const createdBook1 = createBook(book1);
const createdBook2 = createBook(book2);

console.log('Книга 1 (с годом):', createdBook1);
console.log('Книга 2 (без года):', createdBook2);
