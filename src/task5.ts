import { groupBy, having, sort, where } from "./task4.js";

export type Transform<T> = (data: T[]) => T[];

const enum  StepCategory {
    Where = 'where', GroupBy = 'groupBy', Having = 'having', Sort = 'sort'
};

export type WhereStep<T> = Transform<T> & { __category:StepCategory.Where };
export type GroupByStep<T, K extends keyof T> = ((data: T[]) => Group<T, K>[]) & { __category: StepCategory.GroupBy };
export type HavingStep<T, K extends keyof T> = ((groups: Group<T, K>[]) => Group<T, K>[]) & { __category: StepCategory.Having}


export type Group<T, K extends keyof T> = {
    key: T[K];
    items: T[];
};

export function where<T, K extends keyof T>(key: K, value: T[K]): WhereStep<T> {
    const fn: Transform<T> = (data: T[]) => data.filter(item => item[key] == value);
    return Object.assign(fn, { __category: StepCategory.Where as const});
}

export function groupBy<T, K extends keyof T>(key: K): GroupByStep<T, K> {

}

export function having<T, K extends keyof T>(predicate: (group: Group<T, K>) => boolean): HavingStep<T, K> {
    
}

export function sort<T, K extends keyof T>(key: K): SortStep<T> {
    
}

type StepCategory<S> = S extends { __category: infer C} ? C : never;