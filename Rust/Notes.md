# Rust notes

Some interesting facts and knowledge points in learning Rust.

### Struct and Trait

Think different from **class** concept in C++ or Java, data and method are separated in Rust. 

##### 1. No inheritance, but composition for struct. 
   
   For data in struct, Rust do not have inheritance, but recommend composition. 
   
   Given a struct B is composed by another struct A:
   ```rust
   struct StructA {
     x: i32;
   };
   struct StructB {
     a: StructA, 
     // other fields...
   };
   ```
   We have a instance of B `let b: B;`, then wecan access A's member via: `b.a.x;`
   
   Or, if we do not like the indirect way, but want a inherited style like a direct `b.x`, using the [Deref](https://doc.rust-lang.org/std/ops/trait.Deref.html) and [DerefMut](http://doc.rust-lang.org/std/ops/trait.DerefMut.html) traits will make it possible. 
   ```rust
   impl std::ops::Deref for StructB {
     type Target = StructA;
     fn deref(&self) -> &Self::Target {
       &self.a
     }
   }
   ```
   Then, we can make it real.
   ```rust
   let b = StructB { a: StructA };
   println!("{}", b.x);
   ```
   
   * See [the answer on StackOverflow](https://stackoverflow.com/questions/32552593/is-it-possible-for-one-struct-to-extend-an-existing-struct-keeping-all-the-fiel).
 
 
##### 2. Trait and `dyn`
   
   Trait is a group of shared behavior, which looks like the concept `interface`. 
   
   Typically we use `implement Trait for Struct` to attach the methods to data. But since 1.0, Trait is used in double contexts. 
   - As a trait: what is original designed, like:
     ```rust
     impl MyTrait for StructA {}
     ```
   - As a type: trait itself should also be allowed to be implemented, or implement other traits for it:
     ```rust
     impl MyTrait {}
     impl AnotherTrait for MyTrait {}
     ```
     Implement a trait, is just like making a "[interface default method](https://docs.oracle.com/javase/tutorial/java/IandI/defaultmethods.html)" in Java. 
     And implement trait for trait is used for using the methods in trait to implement another trait. 
     
     However, traits are actually unsized / dynamically-sized (or say "abstract"), using it as type leads to complex runtime errors. 
     
     To resolve this, `dyn` is introduced since 1.27. Read [RFC 2113](https://github.com/rust-lang/rfcs/blob/master/text/2113-dyn-trait-syntax.md) for more details.
     <br/>
     It makes the real type of the trait object (used as type) to be decided at runtime via [dynamic dispatch](https://en.wikipedia.org/wiki/Dynamic_dispatch)
  
  
  * See [the answer for *dyn*](https://stackoverflow.com/questions/50650070/what-does-dyn-mean-in-a-type) on StackOverflow.


##### 3. Trait Bounds and Supertrait
   
- [Bounds](https://doc.rust-lang.org/rust-by-example/generics/bounds.html)

   The above section mentioned `dyn` which decorates a trait to be a type. It's useful not always enough. 
   
   Generics are much more expressive in type definition, and we can also need stipulate what functionality a generic type implements. 
   
   Bounds is what we can use trait to restrict what the generic needs to implement.
   
   ```rust
   // Bounds Sample:
   fn printer<T: Display>(t: T) {
    println!("{}", t);
   }
   ```
   The bounds are common in other languages (typically uses keyword `extends`), like the [Bounded Type in Java](https://docs.oracle.com/javase/tutorial/java/generics/bounded.html), [Generic Constraints](https://www.typescriptlang.org/docs/handbook/generics.html#generic-constraints), etc.
   
   Bounds allows muliple traits (with `+` operator), and `where` clause to be more expressive. 
   
- [Supertraits](https://doc.rust-lang.org/rust-by-example/trait/supertraits.html)
   
  Rust doesn't have "inheritance", but you can define a trait as being a superset of another trait.
  
  It's easy to understand since the supertraits just like the syntax of "extends" of "interface" (not class) in Java. It means: 1) implement the subtrait (child interface) must implement all methods in supertrait (parent interface); 2) one trait can have multiple supertrait.


##### 4. Polymorphism
  
  Polymorphism is real an important mechansim to make abstraction and reduce redundant code, no matter in OOP or FP. Though we have no inheritance for struct, but we can do polymorphism. 
  
  The above two sections mentioned: 
     
     a. `dyn`, which runs dynamic dispatch mechanism. 
     
     b. Geneirc bounds, which use trait to stipulate what functionality a type implements.
  
   That's how polymorphism works in Rust. Use `t: dyn Trait` as the type of signature, the `t.someMethod()` will be dynamically decided using which implemention of Trait.
     
   Example:
   ```rust
      struct Circle {
        radius: f64
      }
      struct Rectangle {
        height: f64,
        width: f64
      }

      trait Shape {
        fn area(&self) -> f64;
      }

      impl Shape for Circle {
        fn area(&self) -> f64 {
          PI * self.radius * self.radius
        }
      }
      impl Shape for Rectangle {
        fn area(&self) -> f64 {
          self.height * self.width
        }
      }
      
      // Polymorphism with "dyn" trait type
      fn print_area(shape: &dyn Shape) {
        println!("{}", shape.area());
      }
      
      // Polymorphism by bounds on generic type 
      fn print_area_generic<T: Shape> (shape: &T) {
        println!("{}", shape.area());
      }
      
      fn main() {
        let circle = Circle{radius: 2.0};
        let rectangle = Rectangle{height: 3.0, width: 5.0};
        print_area(&circle); // 12.5664
        print_area(&rectangle); // 15
        print_area_generic(&circle); // 12.5664
        print_area_generic(&rectangle); // 15
      }
   ```


   
