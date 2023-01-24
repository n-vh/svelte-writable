<h1 align="center">svelte-writable</h1>

I found myself needing to copy/paste my personal custom stores a lot, might as well make it public.

This Svelte library gives you two (and more coming) custom `Writable`'s.

## 💻 Install

```bash
npm install @n-vh/svelte-writable
```

## 🛠 Usage

`customWritable(value, callback)`

Create a custom `Writable` that allows you to add custom methods to a store.

```typescript
const store = customWritable(1, (store) => ({
  increment() {
    store.update((n) => n + 1);
  },
  power(n: number) {
    store.update((value) => value ^ n);
  },
}));

store.increment();
// $store = 2

store.power(5);
// $store = 32
```

---

`localStorageWritable(key, initialValue)`

Synchronize your `Writable` with `localStorage`.

```typescript
const store = localStorageWritable('count', 0);

store.set(1);
// $store = 1
// localStorage.count = 1

// manually change localStorage
localStorage.count = 2;
// $store = 2
// localStorage.count = 2
```

## 🤝 Any Suggestion?

Consider opening an Issue or a Pull Request!

## 🚧 TODO

- [ ] Add unit tests
- [ ] Add more stringify possibilities
- [ ] Add a way to combine the two utility functions

&copy; 2023
