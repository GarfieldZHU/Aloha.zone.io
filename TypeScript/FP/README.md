# Functional programming in TypeScript

Introduce and demo some useful snippets of FP in TypeScript. Samples are based Deno runtime, and also compatible with browser:

- Copy the demo and run on [TypeScript Playground](https://www.typescriptlang.org/play/index.html#)
- Run with [Deno](https://deno.land/) runtime, like: 
  `deno run memoize.ts`

- `ramda.js` is one of the best FP library for js/ts. 
  Refer to [official doc](https://ramdajs.com/docs/) and [a tutorial](https://www.ruanyifeng.com/blog/2017/03/ramda.html) in Chinese.

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
- Associativity
  ```typescript
    const associative = compose(f, compose(g, h)) == compose(compose(f, g), h)

    // Both have:
    // associative(x) = f(g(h(x)))
  ```

- Pointfree
  "***Never say your data***"
  ```typescript
  // not pointfree, for data `word` is mentioned
    const snakeCase = (word: string) => word.toLowerCase().replace(/\s+/ig, '_')

    // pointfree
    const pointfreeSnakeCase = compose(replace(/\s+/ig, '_'), toLowerCase);

  ```

  - Reference: [Favoring Curry](https://fr.umio.us/favoring-curry/)
  - Blog: [using pointfree](http://www.ruanyifeng.com/blog/2017/03/pointfree.html)

- Debug 
  It could be hard to find the error place in a pointfree style, since we throw all the parameters away
  Like this:
  ```typescript
    const dasherize = compose(join('-'), toLower, split(' '), replace(/\s{2,}/ig, ' '))
    dasherize('The world is a vampire')
    // TypeError: Cannot read property 'apply' of undefined
  ```

  We can simply use a curried `trace` function to telemetry the parameters for debugging:
  ```typescript
    const trace = curry(function(tag, x){
      console.log(tag, x)
      return x
    })

    const dasherize = compose(join('-'), toLower, trace("after split"), split(' '), replace(/\s{2,}/ig, ' '));
    // after split [ 'The', 'world', 'is', 'a', 'vampire' ]


    // Correct:
    const dasherize = compose(join('-'), map(toLower), split(' '), replace(/\s{2,}/ig, ' '))
    dasherize('The world is a vampire');
  ```

Moreover, we have a similar `pipe` function, which also combines the functions.
The function parameter is called from right to left in `compose`, but left to right in `pipe`.

Practises: [using compose](./compose.ts)


### Functor

> A Functor is a type that implements map and obeys some laws

Typically, we use pointed function which contains a `of` function for instantiating a functor.

```typescript
  Container.of(3)
  // Container(3)

  Container.of(3).map(x => x + 1)
  // Container(4)
```

### Applicative Functor

Apply the value of a functor to the value of another functor. With a function `ap`.


```typescript
  Container.of(add(2)).ap(Container.of(3))
  // Container(5)

  Container.of(2).map(add).ap(Container.of(3))
```



### Reference 

[Mostly adequate guide to FP (in javascript)](https://mostly-adequate.gitbooks.io/mostly-adequate-guide/)

[Mostly adequate guide to FP - 中文](https://llh911001.gitbooks.io/mostly-adequate-guide-chinese/content/)

[Denofun](https://github.com/galkowskit/denofun)
