import { readFile, writeFile } from 'node:fs/promises';

export function csvToJSON(input: string[], delimiter: string): Record<string, string | number>[] {
    if (input.length === 0) {
        throw new Error('Input array is empty');
    }

    const headerLine = input[0]!;
    if (headerLine.trim() === '') {
        throw new Error('Header line is empty');
    }
    const headers = headerLine.split(delimiter);
    const result: Record<string, string | number>[] = [];

    for (let i = 1; i < input.length; i++) {
        const line = input[i]!;
        if (line.trim() === '') continue;

        const values = line.split(delimiter);
        if (values.length !== headers.length) {
            throw new Error(`Line ${i + 1} has ${values.length} fields, expected ${headers.length}`);
        }

        const obj: Record<string, string | number> = {};
        for (let j = 0; j < headers.length; j++) {
            const key = headers[j]!;
            let value: string | number = values[j]!;
            const num = Number(value);
            if (!isNaN(num) && value !== '') {
                value = num;
            }
            obj[key] = value;
        }
        result.push(obj);
    }

    return result;
}

export async function formatCSVFileToJSONFile(
    input: string,
    output: string,
    delimiter: string
): Promise<void> {
    const content = await readFile(input, 'utf-8');
    const lines = content
        .split('\n')
        .map((line: string) => line.trim())
        .filter((line: string) => line !== '');
    const jsonData = csvToJSON(lines, delimiter);
    const jsonString = JSON.stringify(jsonData, null, 2);
    await writeFile(output, jsonString, 'utf-8');
}