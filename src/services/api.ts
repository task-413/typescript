export interface RawBook {
  id: number;
  title: string;
  isbn: string;
  pageCount: number;
  authors: string[];
}

export interface Book extends RawBook {
  coverBlobUrl: string | null;
}

const BOOKS_API = 'https://fakeapi.extendsclass.com/books';
const GOOGLE_BOOKS_API = 'https://www.googleapis.com/books/v1/volumes';

export const fetchBooks = async (): Promise<RawBook[]> => {
  const res = await fetch(BOOKS_API);
  if (!res.ok) throw new Error(`Ошибка загрузки книг: ${res.status}`);
  return res.json();
};

export const fetchCoverAsBlob = async (isbn: string): Promise<string | null> => {
  try {
    const searchRes = await fetch(`${GOOGLE_BOOKS_API}?q=isbn:${isbn}`);
    if (!searchRes.ok) return null;
    
    const searchData = await searchRes.json();
    const thumbnailUrl = searchData?.items?.[0]?.volumeInfo?.imageLinks?.thumbnail;
    if (!thumbnailUrl) return null;

    const imgRes = await fetch(thumbnailUrl);
    if (!imgRes.ok) return null;
    
    const blob = await imgRes.blob();
    return URL.createObjectURL(blob);
  } catch {
    return null;
  }
};