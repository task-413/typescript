import { groupBy, having, sort, where } from "./task4.js";

export type Transform<T> = (data: T[]) => T[];

const enum  StepCategory (
    Where = 'where',
)

export type WhereStep<T> = Transform<T> 

export type Group<T, K extends keyof T> = {
    key: T[K];
    items: T[];
};

export function where<T, K extends keyof T>(key: K, value: T[K]): WhereStep<T> {
    const fn: Transform<T> = (data: T[] => data.filter(item => item[key] == value);
    return Object.assign(fn, { __category: StepCategory.Where as const});
}