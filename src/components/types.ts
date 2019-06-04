export type PullStreamSource<T> = (end: any, cb: (end: any, val: T) => void) => void;
