# Type System


TypeScript has a real cool and strong type system. Let's make good use of it.

### Infer
The keyword `infer` one of the most powerful keywords for building types, which helps us to extract any type from any nested types.

Example, 
```
type Param<T extends (...args: any[]) => any> = 
  T extends (...args: infer A)  => any
  ? A
  : never

const foo = (a: number, b: string) => true
const bar = (a: boolean, b: number, c: number) => false
type t1 = Param<typeof foo>   // [number, string]
type t2 = Param<typeof bar>   // [boolean, number, number]
```
