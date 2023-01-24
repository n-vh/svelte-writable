import type { Writable } from 'svelte/store';
import { get, writable } from 'svelte/store';
import { parse, stringify } from './utils';

type CustomWritable<T, U> = Writable<T> & U;

/**
 * Create a custom `Writable` that allows you to add custom methods to a store.
 * @param value the initial value.
 * @param callback a callback function that must return a `Record` of methods.
 * @returns the newly created `CustomWritable`.
 */
export function customWritable<T, U extends Record<string, Function>>(
  value: T,
  callback: (store: Writable<T>) => U,
): CustomWritable<T, U> {
  const store = writable(value);
  return {
    ...store,
    ...callback(store),
  };
}

/**
 * Synchronize your `Writable` with `localStorage`.
 * @param key the local storage key.
 * @param initialValue the initial value.
 */
export function localStorageWritable<T>(key: string, initialValue: T): Writable<T> {
  const local = localStorage.getItem(key);
  const store = writable(local ? parse(initialValue, local) : initialValue);

  const set = (value: T) => {
    localStorage.setItem(key, stringify(value));
    store.set(value);
  };

  const update = (callback: (value: T) => T) => {
    const value = callback(get(store));
    set(value);
  };

  window.addEventListener('storage', (event) => {
    if (event.key === key && event.newValue) {
      store.set(parse(initialValue, event.newValue));
    }
  });

  return {
    set,
    update,
    subscribe: store.subscribe,
  };
}
