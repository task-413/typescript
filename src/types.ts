export type DeepReadonly<T> = 
  T extends object 
    ? { readonly [K in keyof T]: DeepReadonly<T[K]> } 
    : T;

export type PickedByType<T, U> = {
  [K in keyof T as T[K] extends U ? (U extends T[K] ? K : never) : never]: T[K]
};

export type EventHandlers<T extends Record<string, any>> = {
  [K in keyof T as `on${Capitalize<string & K>}`]: (value: T[K]) => void;
};