import { useState } from 'react';

interface CitySearchProps {
  onSearch: (city: string) => void;
  isLoading?: boolean;
}

export function CitySearch({ onSearch, isLoading = false }: CitySearchProps) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (trimmed) {
      onSearch(trimmed);
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Введите название города"
        disabled={isLoading}
        style={{
          flex: 1,
          padding: '12px 16px',
          fontSize: '16px',
          borderRadius: '16px',
          border: 'none',
          outline: 'none',
          backgroundColor: 'rgba(255,255,255,0.2)',
          backdropFilter: 'blur(5px)',
          color: '#fff',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      />
      <button
        type="submit"
        disabled={isLoading}
        style={{
          padding: '12px 24px',
          fontSize: '16px',
          borderRadius: '16px',
          border: 'none',
          backgroundColor: 'rgba(255,255,255,0.3)',
          backdropFilter: 'blur(5px)',
          color: '#fff',
          fontWeight: 'bold',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        {isLoading ? 'Поиск...' : 'Найти'}
      </button>
    </form>
  );
}