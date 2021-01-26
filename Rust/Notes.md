# Rust notes

Some interesting facts and knowledge points in learning Rust.

### Struct and Trait

Think different from **class** concept in C++ or Java, data and method are separated in Rust. 

1. No inheritance, but composition for struct. 
   
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
 
 
2. Trait and `dyn`
   
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
   
