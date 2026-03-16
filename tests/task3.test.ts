import { describe, it, expect, beforeEach, vi } from 'vitest';
import { csvToJSON, formatCSVFileToJSONFile } from '../src/task3.js';
import { readFile, writeFile } from 'node:fs/promises';

vi.mock('node:fs/promises', () => ({
  readFile: vi.fn(),
  writeFile: vi.fn()
}));

describe('csvToJSON', () => {
  it('корректный CSV в массив', () => {
    const input = [
      'name;age;city',
      'Витя;30;Москва',
      'Коля;25;Воркута'
    ];
    const result = csvToJSON(input, ';');
    expect(result).toEqual([
      { name: 'Витя', age: 30, city: 'Москва' },
      { name: 'Коля', age: 25, city: 'Воркута' }
    ]);
  });

  it('числовые строки в числа', () => {
    const input = [
      'id,value',
      '1,16',
      '2,14.1'
    ];
    const result = csvToJSON(input, ',');
    expect(result).toEqual([
      { id: 1, value: 16 },
      { id: 2, value: 14.1 }
    ]);
  });

  it('должен оставлять строки строками, если они не числа', () => {
    const input = [
      'col1;col2',
      'x;y'
    ];
    const result = csvToJSON(input, ';');
    expect(result).toEqual([{ col1: 'x', col2: 'y' }]);
  });

  it('должен игнорировать пустые строки', () => {
    const input = [
      'x;y',
      '10;10',
      '',
      '20;20'
    ];
    const result = csvToJSON(input, ';');
    expect(result).toEqual([
      { x: 10, y: 10 },
      { x: 20, y: 20 }
    ]);
  });

  it('должен выбрасывать ошибку, если заголовок пустой', () => {
    const input = [''];
    expect(() => csvToJSON(input, ',')).toThrow('Header line is empty');
  });

  it('должен выбрасывать ошибку при несовпадении количества полей', () => {
    const input = [
      'a;b;c',
      '1;2'
    ];
    expect(() => csvToJSON(input, ';')).toThrow('Line 2 has 2 fields, expected 3');
  });

  it('должен выбрасывать ошибку, если входной массив пуст', () => {
    expect(() => csvToJSON([], ';')).toThrow('Input array is empty');
  });
});

describe('formatCSVFileToJSONFile', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('должен читать файл, преобразовывать CSV и записывать JSON', async () => {
    readFile.mockResolvedValue('name;age\nКостя;30\nПаша;25');

    await formatCSVFileToJSONFile('input.csv', 'output.json', ';');

    expect(readFile).toHaveBeenCalledWith('input.csv', 'utf-8');

    const expectedJSON = JSON.stringify([
      { name: 'Костя', age: 30 },
      { name: 'Паша', age: 25 }
    ], null, 2);
    expect(writeFile).toHaveBeenCalledWith('output.json', expectedJSON, 'utf-8');
  });

  it('должен пробрасывать ошибку, если csvToJSON падает (несовпадение полей)', async () => {
    readFile.mockResolvedValue('name;age\nКостя;30;extra');

    await expect(formatCSVFileToJSONFile('bad.csv', 'out.json', ';')).rejects.toThrow();
    expect(writeFile).not.toHaveBeenCalled();
  });
});