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

- **Partial&lt;T&gt;**
  
  Given `T` = { a: string, b: number } is an interface with several parameters. We want to build a type with all props options.

  Then we have `Partial<T>` = { a?: string, b?: number }

- **Required&lt;T&gt;**
  
  The opposite to `Partial`

- **Pick&lt;T, K&gt;**
  
  Given `T` = { a: string, b: number， c: boolean[] }， pick only some props from it.

  Then we can have `Pick<T, 'c'>` = { c: boolean }
               Or, `Pick<T, 'a', 'b'>` = { a: string, b: number }

- **ReturnType&lt;T&gt;**
  
  Get the return type of a function/lambda type.
  
  Given `T` = (...args: any[]) => { foo: number, bar: string },
  
  Then we have `ReturnType<T>` = { foo: number, bar: string }

- etc.


#### Custom useful types

With keyword `typeof`, `keyof`, `infer`, ... We can extend and derive almost any types from existing types. 

In specific use cases, there will be some cusomized types to resovle problem:

- React.js
  
  Typescript helps gooding props typing for React. 
  
  - **PropType&lt;T, K&gt;**
     
    Given the props type of a component, get the type of one specific property. (It helps a lot if we require this property in the upper level component)
     
    ```typescript
      /** Given a object type, and a property name, get the type of that object property
       *  Example:
       *    type Foo = { a: number, b: { x: string[], y: (y: string) => boolean }, c: () => void }
       *    type A = PropType<Foo, 'a'>                   // number
       *    type B = PropType<Foo, 'b'>                   // { x: string[], y: (y: string) => boolean }
       *    type C = PropType<Foo, 'c'>                   // () => void
       *    type Bx = PropType<PropType<Foo, 'b'>, 'x'>   // string[]
       *    type By = PropType<PropType<Foo, 'b'>, 'y'>   // (y: string) => boolean
       */ 
      export type PropType<TObj, TProp extends keyof TObj> = TObj[TProp]
    ```
    
  - **ReactFCPropsType&lt;T, K&gt;**
    
    Givent a third party React component library, we may suffer that the lib does not export the type of the component props but we do need it. 
    
    Defining types in code for 3rd party props may suffer compatibility problem when library updates its interface. We can just infer the type and make it easy to find the type mismatch when compiling.
    
    ```typescript
      /** Given a type of React function component, get the type of the props of it.
       *  It could be used if some 3rd party component does not externally export the props type, but we need it.
       *  (Use `typeof` to assign the type of React.FC component as generic parameter)
       *  Example:
       *    ```
       *      import { Tree, Button } from 'antd'
       *
       *      type TreeProps = ReactFCPropsType<typeof Tree>      // The type of the props required by Tree
       *      type ButtonProps = ReactFCPropsType<typeof Button>  // The type of the props required by Button
       *    ```
       */
      export type ReactFCPropsType<TReactFC> = TReactFC extends (props: infer U, ...args: any[]) => any
        ? U
        : never
    ```

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
