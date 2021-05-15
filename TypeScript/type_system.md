# Type System


TypeScript has a real cool and strong type system. Let's make good use of it.

---

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

<br/>

---

### Type Constructor / Type Utilities

TypeScript allows builds new types from old ones and define some type infer to generate types from existing types. 

It is a typical feature called [Type Constructor](https://en.wikipedia.org/wiki/Type_constructor) in [type theory](https://en.wikipedia.org/wiki/Type_theory).

Type constructors are really useful to use such type utilities to build more strong and reliable types.

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

#### Third party extended type utility lib

- [utility-types](https://github.com/piotrwitek/utility-types)

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

<br/>

---

### Coviarance & contravariance 

[Covariance and contravariance](https://en.wikipedia.org/wiki/Covariance_and_contravariance_(computer_science)) is what describes how [subtyping](https://en.wikipedia.org/wiki/Subtyping) works in a programming language. 

#### 1. A Java problem

See the example below:

- Is it compilable?
- Is it runnable?
- Which line will report error?
- Which line should be better to found the error?

```java
    public static void f() {
        String[] a = new String[2];
        Object[] b = a;
        a[0] = "hi";
        b[1] = Integer.valueOf(42);
    }
```

<details>
  <summary>Answer</summary>
  
  ```java
    public static void f() {
        String[] a = new String[2];
        Object[] b = a;
        a[0] = "hi";
        b[1] = Integer.valueOf(42);  // <--- Runtime exception: java.lang.ArrayStoreException
    }
  ```
</details>

<details>
  <summary>Why not like this?</summary>
  
  ```java
    public static void f() {
        String[] a = new String[2];
        Object[] b = a;  // ~~~~~~~ Compile error: "a": String[] could not be assigned to "b": Object[]
        a[0] = "hi";
        b[1] = Integer.valueOf(42);  
    }
  ```
</details>

<details>
  <summary>It is Object array here, why Object is right? </summary>
  
  ```java
    public static void f() {
        String a = new String();
        Object b = a;  // Typical polymorphism
        a = "hi";
        b = Integer.valueOf(42);  // Awesome! 
    }
  ```
  
  What's the difference? 
  
  - Array has multiple values? 
  - `b[0]` and `b[1]` cannot have different types?
  - We say "String[] should not be assigned to Object[]", why "assign String to Object" is the core of OOP?

</details>

<details>
  <summary>Answer</summary>
  
  - In OOP, we say String is a typically subtype of Object.
  - Assign subtype to super-type is always correct.
  - <u>***But, WATCH OUT! String[] is not the subtype of Object[] !***</u>
  

</details>

In conclusion, we could say T[A] is subtype of T[B], regardless T's definition but only know A is subtype of B.

<br/>

#### 2. Covariant， contravariant, bivariant and invariant

[Convariance and contravariance](https://en.wikipedia.org/wiki/Covariance_and_contravariance_(computer_science)) are describing the relationship of types after a type calculation. 

- In TypeScript, we use keyword `type` and generic to construct new types from existing, which is called **Type Constructor**. 

  e.g. `type C<T> = T[]`

  It happens at compile time only, which totally disappears at JavaScript runtime. 
  
  We say type `C` defines a collection mapping from **T** to **C&lt;T&gt;**. 
  
- The subtype between such type mapping or constrution `C` is called "***Variance***".
  
  Given collection `A` is subtype/subset of `B`, we say `A ⊆ B` in math:
  
  Variance is the relationshipt between mapped collections `C<A>` and `C<B>`
  
  In math, we use `⊆`, `⊇` to represent the subset/superset relationship. In CS, we use `<:` for [subtyping](https://en.wikipedia.org/wiki/Subtyping).
  
  - Covariance
    
    It keeps the subset relationship.
    
    `A <: B` => `C<A> <: C<B>`
    
  - Contravariance

    It reverses the relationship. The original child set is constructed to be superset.

    `A <: B` => `C<A> :> C<B>`

  - Biariance

    Both relationship applied.
    
    `A <: B` => `C<A> <: C<B>` AND `C<A> :> C<B>`

  - Invariance

    No variance anymore after remap.
    
    `A <: B` => `C<A> ⊄ C<B>` AND `C<B> ⊄ C<A>`
    

<br/>

#### 3. Covariance in arrays

Back to the question above, the problem comes to `String[]` is not subtype of `Object[]`?

1. Covariance, contravariance, invariance?
2. In Java, we see it is covariance. `String[]` is allowed to be assigned to `Object[]`. 
  
   But obviously, it's not correct when write the array is writtable. 
   
3. If we say the array is read only, covariance is correct now. 
   
   ```Java
   /* readonly*/ Object[] a = new String[] {"foo", "bar", "test"};
   System.out.println(a[0], a[1], a[2]);
   ```
   
<details>
  <summary>Answer</summary>
  
  - A readable and writeable array should be ***INVARIANT***.
  - A readonly array is **covariant**.

</details>

<details>
  <summary>Extension</summary>
  
  - So this is typical static typing problem in Java (as well as C#). 
  - Guess Why? 

    <details>
    <summary>Root cause</summary>
  
      - Yes, GENERICS. Java and C# does not support generics in old time. 
        
        They use parent typing like the generic bounding to make functions accept more generic types.
        
      ```Java
          boolean equalArrays (Object[] a1, Object[] a2); // equal function should be readonly, which is safe.
          void shuffleArray(Object[] a);
      ```
      - It should be defined like this. 
      
      ```Java
          <T extends Comparable<T>> boolean equalArrays (T[] a1, T[] a2);
          <T> void shuffleArray(T[] a);
      ```
      
      - Today, the legacy feature is a burden now. 
        
        Use it must take care of if the array is writable to avoid runtime errors.
        
        Or use some immutable/readonly array instead rather a raw object array. (of course, they introduces overhead before Java/C# introdues raw immutable data type primitives)
        
        In C# :
        
        ```cs
        IEnumerable<object> // replace "object[]"
        ```
        
        In Java :
        
        ```Java
        List<Object> items = Collections.unmodifiableList(Arrays.asList("a", "b", "c"));
        ```

    </details>
</details>
  
  

<br/>

#### 4. Covariance in function typing

The correct behavior for function typing is:
- The return type is covariant.
   
  Given `A` &lt;: `B`, we have `() => A ` &lt;: ` () => B`.

- The parameters' types are contravariant.

  Given `A` &lt;: `B`, we have `(a: A) => void ` :&gt; ` (b: B) => void`.
  
- Above rules work together. 
   
  Given `A` &lt;: `B` and `C` &lt;: `D`, 
  
  we have `(b: B) => C ` :&gt; ` (a: A) => D`.


See the [sample](https://www.typescriptlang.org/play?ssl=36&ssc=13&pln=36&pc=18#code/PTAEFEA8EMFsAcA2BTUBaUArAltAXgBYCuAUCKAMID2AdgC4BO0AbtA7vaNDQCaVWt23OiTJgACimgBnVAGNE2OQGtQAImo0AZtgDma0HSqgiNOQWQrDF9dMZK6AMVNy62WgBUAnvGTSDRqCyqHQ2AO5sNNg0utJcutDRAHSi0XTIDFrQcqgAglGw0IigAN4koBWgFnoEdABcoDREsABGGSQAvqn0GVk5oAAiVLqgyJDpvHH52IXFZZWgLWzKDQAUAJSgALwAfKDMVNg8nd3pmdmoAOIMyF4EVKZ8YxM8cUMj85VaVFRrm7v7Q7HLokNK9C6gAASRGkyi8o3GyEmg2GpXKlSWDD+2z2ByOJ1E5C0LjctFAAAMtOTQIV4TDUNBQDxsFotBkkXRDD4GTQaFQ6NBSTR1NDYV4DGECEoCDToPCWjdoKpQqhBBwRHJaHZQFptqBViM1jxhg13v89maGk1WhkcWiFpqaNriGK9SUOlw4qK4eiKjc6EQGMLdKsXXD1klqrpagSSI7tboAIx60MPXgNa63e6PdYZm53NN8AElUD+wPCktR2oNRMABlAHpkoEzBceDdE8c5ugATCns+nm-n+zxc6BprM7SWy0HSlVkDV6qA6w3PWOCkV23GtV2AMwp7gzIoNcdFUcn4rF0vIAMzyvz6OL5eNqbr4ogzugXQAFn3r+Pr9HFth0nK8bwrOcFxretn0HLNC03EgtANRNNlAcgAA1RCQntUIwrCDR3XCwEwxCDS-IjQEALCISCAA). 

TS config `strictFunctionType` will control if the function parameter is acknowledged as covariance or contravariance. 

<br/>

#### 5. Covariance in inheritance


<br/>

#### 6. Covariance in generic

##### Upper/lower boundary constraints

1. In Java
   
   We have bound descriptor `extends` and `super` in Java
   
   ```Java
   // Lower bounds is very common in the languages support generic
   List<? extends Animal>
   // Upper bounds is not common, Java uses "super" keyword
   List<? super Animal>
   ```
   
2. In Typescript
   
   Up-to-date, Typescript does not have a upper-bound generic type contraints yet. The open issue is: [TypeScript#9252](https://github.com/microsoft/TypeScript/issues/9252)
   
   However, with the existing TS type utilies, we have a workaround to support upper boundary: say `Partial<T>`

   
   See the case discussed: [here](https://github.com/Microsoft/TypeScript/issues/4889#issuecomment-200388292), think:
   
   `Partial<T>` is equivalent with `<S super T>` ? 

<br/>

#### 7. Samples

- In React component
  React functional component is recommended. The variance of React props should be understood to avoid unnecessary problems.
  
  See the example below in real practice, where is the problem?
  ```typescript
  // React component definition:
  type Elem = {
    id: string;
  }
  type Props = {
      elem: Elem;
      onClick: (elem: Elem) => void;
  }

  // React FC
  const MyComp: React.FC<Props> = (props: Props) => {
    const { elem, onClick, }
    const guiElement = {
      ...elem,
      // Extended GUI properties
      name: `element - ${elem.id}`,
      desc: `description for - ${elem.id}`,
    }
    
    // Event handler callback
    const clickHandler = React.useCallback((_e) => {
      onClick(guiElement)
    }, [])
  
    return <button onClick={clickHandler}>
      {guiElement.id}
    </button>
  }
  
  ```

  ```typescript
  // Use the above component
  const customElem = {
    id: '0hd3ga1fa3h2664g',
    count: 99, 
    name: 'bar',
  }
  
  const cb = (e: Elem) => {
    alert((e as any).name)     // ?
    alert(JSON.stringify(e))   // ?
  }
  
  ReactDOM.render(<MyComp 
    elem={customElem} // is this correct?
    onClick={cb}      // is this correct?
  />)
  ```
  
  Simplify it, look at: 
  
  [Sample on playground](https://www.typescriptlang.org/play?noUncheckedIndexedAccess=true&downlevelIteration=true&noUnusedLocals=true&noUnusedParameters=true&importHelpers=true&strict=true&noFallthroughCasesInSwitch=true&noPropertyAccessFromIndexSignature=true&isolatedModules=false&stripInternal=false#code/PTAEBEFMDMEsDtYBdYHt4CgFMgJ2gIYDGkoAogDaQC2oA3hqE6LACYBcoAzkrggOYBuDAF8s8HPmKkAwgFceqapRqhIADxzxWXclVoNmoeAWqROPPvCGjxkwiVABxObBW0NWnXtWHmrSC4iC14BYTEMInQeUABlWGo5CgIcGSUAB1AAXlAACkh9TncAGlAiACNOfMKfagBKbIA+UAA3VDYGrOa-Jij4GP5Xd04XN31s+kYjZgA6OYKaYqnp0ACgzgByAHcd3Y2lozEjCtzBsZo62wwMEFAAVS4CfkhI6KQ1GvlFZXGcnpYOKANgBGUHA-bLYymcxAgBM8PhEIifRi6BkAAsCNYYXkFtQRkN9J1mm02IwctUaATzvUmpNjtFUFQZhRUPxchtmgArLjoTalABSsQA8gA5GaWASwaAAT0p9UuERuYAASpAAI6uXCkABEJVxNXcxNa7VYOuVzlgLUg8FAOq+SCU+oNVOchIudNJZow8USyVSGXlpTRmOxdSAA)

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

- Remember runtime features will corrupt your static typing. 
  
  Like **Reflection**, it will make the type inference missing at where the reflection begins.
  
  Reflection is the concept occurs in Java and C#. For dynamic language, it is more common being used naturally with literal objects.
  
  Like `for (const key in obj) ...` 
  
  It is really useful, but it is really a runtime feature and heavily breaks static typing system. Remember use it where you understand and be careful with typing.
  
  Example:
  ```typescript
  // Base type
  type Base = {
    id: string;
    name: string;
  }
  
  // literal object derives the `Base`
  const obj: Base = {
    id:       'abc',
    name:     'test',
    category: 'foo',
    item:     'bar',
  }
  
  // JSON stringify method will iterate the runtime instance of `obj`, instead of the part of `Base`
  const json = JSON.stringify(obj)
  // JSON.parse is also runtime method, which makes us lost typing information.
  const restored = JSON.parse(json) /* as Base  */ 
  ``` 
  
  

