export type Transform<T> = (data: T[]) => T[];

export type Where<T> = <K extends keyof T>(key: K, value: T[K]) => Transform<T>;

export type Sort<T> = <K extends keyof T>(key: K) => Transform<T>;

export type Group<T, K extends keyof T> = {
  key: T[K];
  items: T[];
};

export type GroupBy<T> = <K extends keyof T>(key: K) => (data: T[]) => Group<T, K>[];

export type GroupTransform<T, K extends keyof T> = (groups: Group<T, K>[]) => Group<T, K>[];

export type Having<T> = <K extends keyof T>(
  predicate: (group: Group<T, K>) => boolean
) => GroupTransform<T, K>;

export function where<T, K extends keyof T>(key: K, value: T[K]): Transform<T> {
  return (data: T[]) => data.filter(item => item[key] === value);
}

export function sort<T, K extends keyof T>(key: K): Transform<T> {
  return (data: T[]) =>
    [...data].sort((a, b) => {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    });
}

export function groupBy<T, K extends keyof T>(key: K): (data: T[]) => Group<T, K>[] {
  return (data: T[]) => {
    const groups = new Map<T[K], Group<T, K>>();
    for (const item of data) {
      const groupKey = item[key];
      if (!groups.has(groupKey)) {
        groups.set(groupKey, { key: groupKey, items: [] });
      }
      groups.get(groupKey)!.items.push(item);
    }
    return Array.from(groups.values());
  };
}

export function having<T, K extends keyof T>(
  predicate: (group: Group<T, K>) => boolean
): GroupTransform<T, K> {
  return (groups: Group<T, K>[]) => groups.filter(predicate);
}

export function query<T>(...steps: Array<(data: any) => any>): (data: T[]) => any {
  return (data: T[]) => steps.reduce((acc, step) => step(acc), data);
}