export type Transform<T> = (data: T[]) => T[];

const enum StepCategory {
  Where = 'where',
  GroupBy = 'groupBy',
  Having = 'having',
  Sort = 'sort'
}

export type Group<T, K extends keyof T> = {
  key: T[K];
  items: T[];
};

export type WhereStep<T> = Transform<T> & { __category: StepCategory.Where };
export type GroupByStep<T, K extends keyof T> = ((data: T[]) => Group<T, K>[]) & { __category: StepCategory.GroupBy };
export type HavingStep<T, K extends keyof T> = ((groups: Group<T, K>[]) => Group<T, K>[]) & { __category: StepCategory.Having };
export type SortStep<T> = Transform<T> & { __category: StepCategory.Sort };

export function where<T, K extends keyof T>(key: K, value: T[K]): WhereStep<T> {
  const fn: Transform<T> = (data: T[]) => data.filter(item => item[key] === value);
  return Object.assign(fn, { __category: StepCategory.Where as const });
}

export function sort<T, K extends keyof T>(key: K): SortStep<T> {
  const fn: Transform<T> = (data: T[]) =>
    [...data].sort((a, b) => {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    });
  return Object.assign(fn, { __category: StepCategory.Sort as const });
}

export function groupBy<T, K extends keyof T>(key: K): GroupByStep<T, K> {
  const fn = (data: T[]): Group<T, K>[] => {
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
  return Object.assign(fn, { __category: StepCategory.GroupBy as const });
}

export function having<T, K extends keyof T>(
  predicate: (group: Group<T, K>) => boolean
): HavingStep<T, K> {
  const fn = (groups: Group<T, K>[]): Group<T, K>[] => groups.filter(predicate);
  return Object.assign(fn, { __category: StepCategory.Having as const });
}

type StepCategoryOf<S> = S extends { __category: infer C } ? C : never;

type AllowedNext = {
  [StepCategory.Where]: StepCategory.Where | StepCategory.GroupBy;
  [StepCategory.GroupBy]: StepCategory.GroupBy | StepCategory.Having;
  [StepCategory.Having]: StepCategory.Having | StepCategory.Sort;
  [StepCategory.Sort]: StepCategory.Sort;
};

type ValidateOrder<Steps extends readonly any[], Current extends StepCategory = StepCategory.Where> = 
  Steps extends readonly [infer First, ...infer Rest]
    ? StepCategoryOf<First> extends AllowedNext[Current]
      ? ValidateOrder<Rest, StepCategoryOf<First>>
      : never
    : Steps;

export function query<T>(...steps: readonly any[]): (data: T[]) => any {
  return (data: T[]) => steps.reduce((acc, step) => step(acc), data);
}