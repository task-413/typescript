import { expectType } from 'ts-expect';
import type { DeepReadonly, PickedByType, EventHandlers } from '../src/types.js';

type NestedObj = {
  a: number;
  b: {
    c: string;
    d: {
      e: boolean;
    };
  };
};

type ReadonlyNested = DeepReadonly<NestedObj>;

expectType<{ readonly a: number; readonly b: { readonly c: string; readonly d: { readonly e: boolean; } }; }>({} as ReadonlyNested);
expectType<readonly number[]>([] as DeepReadonly<number[]>);
expectType<string>('hello' as DeepReadonly<string>);

type MixedObj = {
  name: string;
  age: number;
  email: string;
  active: boolean;
  score: number;
};

type StringsOnly = PickedByType<MixedObj, string>;
expectType<{ name: string; email: string }>({} as StringsOnly);

type NumbersOnly = PickedByType<MixedObj, number>;
expectType<{ age: number; score: number }>({} as NumbersOnly);

type BooleansOnly = PickedByType<MixedObj, string[]>;
expectType<{}>({} as BooleansOnly);

type Events = {
  click: MouseEvent;
  submit: FormData;
  change: string;
};

type Handlers = EventHandlers<Events>;

expectType<{
  onClick: (value: MouseEvent) => void;
  onSubmit: (value: FormData) => void;
  onChange: (value: string) => void;
}>({} as Handlers);

const handler: Handlers = {
  onClick: (e: MouseEvent) => { expectType<MouseEvent>(e); },
  onSubmit: (d: FormData) => { expectType<FormData>(d); },
  onChange: (s: string) => { expectType<string>(s); },
};
expectType<Handlers>(handler);