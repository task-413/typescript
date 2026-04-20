import { render, screen, fireEvent } from '@testing-library/react';
import { CitySearch } from './CitySearch';
import { describe, expect, it, vi } from 'vitest';

describe('CitySearch', () => {
  it('отображает поле ввода и кнопку', () => {
    const onSearch = vi.fn();
    render(<CitySearch onSearch={onSearch} />);

    expect(screen.getByPlaceholderText('Введите название города')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Найти' })).toBeInTheDocument();
  });

  it('вызывает onSearch с введённым текстом при отправке формы', () => {
    const onSearch = vi.fn();
    render(<CitySearch onSearch={onSearch} />);

    const input = screen.getByPlaceholderText('Введите название города');
    const button = screen.getByRole('button', { name: 'Найти' });

    fireEvent.change(input, { target: { value: 'Москва' } });
    fireEvent.click(button);

    expect(onSearch).toHaveBeenCalledTimes(1);
    expect(onSearch).toHaveBeenCalledWith('Москва');
  });

  it('не вызывает onSearch при пустом вводе', () => {
    const onSearch = vi.fn();
    render(<CitySearch onSearch={onSearch} />);

    const button = screen.getByRole('button', { name: 'Найти' });
    fireEvent.click(button);

    expect(onSearch).not.toHaveBeenCalled();
  });

  it('блокирует ввод и кнопку при isLoading=true', () => {
    const onSearch = vi.fn();
    render(<CitySearch onSearch={onSearch} isLoading={true} />);

    const input = screen.getByPlaceholderText('Введите название города');
    const button = screen.getByRole('button', { name: 'Поиск...' });

    expect(input).toBeDisabled();
    expect(button).toBeDisabled();
  });
});