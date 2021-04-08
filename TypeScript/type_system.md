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
