# Type System


TypeScript has a real cool and strong type system. Let's make good use of it.

### Infer
The keyword `infer` one of the most powerful keywords for building types, which helps us to extract any type from any nested types.

Example, extract the type list of the parameters of a function
```typescript
type Param<T extends (...args: any[]) => any> = 
  T extends (...args: infer A)  => any
  ? A
  : never

const foo = (a: number, b: string) => true
const bar = (a: boolean, b: number, c: number) => false
type t1 = Param<typeof foo>   // [number, string]
type t2 = Param<typeof bar>   // [boolean, number, number]
```

### Type Utilities

TypeScript allows calculate type and define some type infer to generate types from existing types. 

It is really useful to use such type utilities to build more strong and reliable types.

#### Built-in utilities types

TypeScript contains several useful type utils,

Refer to [official utility types](https://www.typescriptlang.org/docs/handbook/utility-types.html).

Example of some really useful ones:

- **Partial<T>**
  
  Given `T` = { a: string, b: number } is an interface with several parameters. We want to build a type with all props options.

  Then we have `Partial<T>` = { a?: string, b?: number }

- **Required<T>**
  
  The opposite to `Partial`

- **Pick<Type, Keys>**
  
  Given `T` = { a: string, b: number， c: boolean[] }， pick only some props from it.

  Then we can have `Pick<T, 'c'>` = { c: boolean }
               Or, `Pick<T, 'a', 'b'>` = { a: string, b: number }

- **ReturnType<Type>**
  
  Get the return type of a function/lambda type.
  
  Given `T` = (...args: any[]) => { foo: number, bar: string },
  
  Then we have `ReturnType<T>` = { foo: number, bar: string }

- etc.

### Coviarance & contravariance 

#### Samples

- Sub union as React props in TypeScript
  Given a React component requires a prop with a union type: A | B | C, the user uses the component provides an instance with type of the narrower union type: A | C. 
  Is this safe?
  
  ```typescript
  type Props = { bar: A | B | C } 
  const Foo: React.FC<Props> = (props) => {
    // ... do with props.bar
  }

  // use case:
  type TestType = A | C
  const myBar: TestType
  
  render(<Foo bar={myBar} />) // ?? Type safe
  
  ```

- 
