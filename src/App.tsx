import { useEffect, useState } from 'react';
import { BookCard } from './components/BookCard';
import { fetchBooks, fetchCoverAsBlob, Book } from './services/api';
import './App.css';

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const rawBooks = await fetchBooks();
        
        const loadedBooks = await Promise.all(
          rawBooks.map(async (raw) => {
            const coverBlobUrl = await fetchCoverAsBlob(raw.isbn);
            return { ...raw, coverBlobUrl };
          })
        );
        
        setBooks(loadedBooks);
      } catch (err) {
        setError('Не удалось загрузить данные. Проверьте консоль.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <div className="center">Загрузка книг...</div>;
  if (error) return <div className="center error">{error}</div>;

  return (
    <main className="app">
      <h1 className="app__title">Библиотека</h1>
      <div className="books-grid">
        {books.map((book) => (
          <BookCard
            key={book.id}
            title={book.title}
            authors={book.authors}
            coverBlobUrl={book.coverBlobUrl}
          />
        ))}
      </div>
    </main>
  );
}

export default App;