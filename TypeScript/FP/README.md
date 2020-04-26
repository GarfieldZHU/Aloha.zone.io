# Functional programming in TypeScript

Introduce and demo some useful snippets of FP in TypeScript. Samples are based Deno runtime, and also compatible with browser:

- Copy the demo and run on [TypeScript Playground](https://www.typescriptlang.org/play/index.html#)
- Run with [Deno](https://deno.land/) runtime, like: 
  `deno run memoize.ts`

---

### Keep *IMMUTABLE*

The best practise in FP is using **immutable** variables anywhere if possible. 

In TypeScript, use `const` for type declaration and `readonly` for properties of type/interface and args of functions as much as possible. Avoid using `let` or `var` declaration if they are not a must. (Actually, there should always be a way to abandon a mutable variable) 

Example:
```typescript
declare const a : numer
const b = a > 0 ? 'positive' : 'negativeOrZero'   // $ExpectedType: 'positive' | 'negativeOrZero'
let b = a > 0 ? 'postive' : 'negativeOrZero'     // $ExpectedType: string
```


### *Pure* function

- **Cacheable**
  
  [Memoization](./memoize.ts)

- Portable / Self-documenting
- Testable
- Reasonable
- Concurrency


### Curry

TypeScript is not born to support curry. Node package like `[Rambda](https://github.com/ramda/ramda)` provides a good implementation of curry, but since we are on `Deno` with TypeScript, it seems not very direct for us to use it, neither give a cool implementation of it in TS. 

A sample for a currying step by step: [How to master advanced TypeScript patterns](https://www.freecodecamp.org/news/typescript-curry-ramda-types-f747e99744ab/)

Also, we can look forward for the proposed feature [Variadic Kinds](https://github.com/Microsoft/TypeScript/issues/5453), which will make it easier to define a typed `curry` function. 

Fortunately, [Denofun](https://github.com/galkowskit/denofun) serves a group of useful utilities for FP including `curry`. 

Example:
```typescript
import curry from "https://deno.land/x/denofun/lib/curry.ts";

const greet = (name: string, age: number) => `hello, I'm ${name} and I'm ${age} years old`;
const curriedGreet = curry(greet);
curriedGreet("Tomasz")(26) 
```

Practises: [using curry](./curry.ts)

### Compose

Practises: [using compose](./compose.ts)


### Reference 

[Mostly adequate guide to FP (in javascript)](https://mostly-adequate.gitbooks.io/mostly-adequate-guide/)

[Mostly adequate guide to FP - 中文](https://llh911001.gitbooks.io/mostly-adequate-guide-chinese/content/)

[Denofun](https://github.com/galkowskit/denofun)
