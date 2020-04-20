# Functional programming in TypeScript

Introduce and demo some useful snippets of FP in TypeScript. Samples are based Deno runtime, and also compatible with browser:

- Copy the demo and run on [TypeScript Playground](https://www.typescriptlang.org/play/index.html#)
- Run with [Deno](https://deno.land/) runtime, like: 
  `deno run memoize.ts`

---

### *Pure* function

- **Cacheable**
  
  [Memoization](./memoize.ts)

- Portable / Self-documenting
- Testable
- Reasonable
- Concurrency

### Curry

TypeScript is not born to support curry. Node package like `[Rambda](https://github.com/ramda/ramda)` provides a good implementation of curry, but since we are on `Deno` with TypeScript, it seems not very direct for us to use it, neither give a cool implementation of it in TS. 

We can look forward for the proposed feature [Variadic Kinds](https://github.com/Microsoft/TypeScript/issues/5453), which will make it easier to define a typed `curry` function.


### Compose


### Reference 

[Mostly adequate guide to FP (in javascript)](https://mostly-adequate.gitbooks.io/mostly-adequate-guide/)

[Mostly adequate guide to FP - 中文](https://llh911001.gitbooks.io/mostly-adequate-guide-chinese/content/)

