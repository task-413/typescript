import { useEffect, useState } from 'react';
import './BookCard.css';

interface BookCardProps {
  title: string;
  authors: string[];
  coverBlobUrl: string | null;
}

export const BookCard = ({ title, authors, coverBlobUrl }: BookCardProps) => {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    return () => {
      if (coverBlobUrl?.startsWith('blob:')) {
        URL.revokeObjectURL(coverBlobUrl);
      }
    };
  }, [coverBlobUrl]);

  return (
    <article className="book-card">
      <div className="book-card__cover-wrapper">
        {coverBlobUrl && !imgError ? (
          <img 
            src={coverBlobUrl} 
            alt={`Обложка ${title}`} 
            onError={() => setImgError(true)} 
          />
        ) : (
          <div className="book-card__placeholder">📖</div>
        )}
      </div>
      
      <h2 className="book-card__title">{title}</h2>
      <p className="book-card__authors">{authors.join(', ') || 'Автор не указан'}</p>
    </article>
  );
};