# Too Many Linked Lists

The [Learn Rust With Entirely Too Many Linked Lists](https://rust-unofficial.github.io/too-many-lists/)

## Keynotes

---
- Recursive structures must be boxed. // Refers to [std::boxed](https://doc.rust-lang.org/std/boxed/index.html)
- The internals of `enum` are exposed public, so no private member is expected in a `pub enum` 
---
- Rust does not support method overloading. Use `trait` way instead.
Example: 
In other language like C++, we can overload the functions using a different parameters signature:
```cpp
void foo(int x) {}
void foo(double x) {}
```

Use `trait` in Rust for overloaded constructors:
```rust
// --- Not available
// fn foo(x: i32) {}
// fn foo(x: f32) {}
// ---

enum MyParams {
    Int(i32),
    Float(f32),
    MultiParams(i64, f64),
}

trait MyParamsTrait {
    fn to_params(&self) -> MyParams;
}

impl MyParamsTrait for i32 {
    fn to_params(&self) -> MyParams {
        MyParams::Int(*self)
    }
}

impl MyParamsTrait for f32 {
    fn to_params(&self) -> MyParams {
        MyParams::Float(*self)
    }
}

impl MyParamsTrait for (i64, f64) {
    fn to_params(&self) -> MyParams {
        MyParams::MultiParams(*self)
    }
}


// method definition
fn bar(x: &dyn MyParamsTrait) {}

```

---

- [Prelude](https://doc.rust-lang.org/std/prelude/) provides some traits, types and functions which were judged so frequently used, so that we can use some directly and are not required to explicitly import them each and every time. 

   Like [Copy](https://doc.rust-lang.org/std/clone/trait.Clone.html), [Box](https://doc.rust-lang.org/std/boxed/struct.Box.html), [Option](https://doc.rust-lang.org/std/option/enum.Option.html), [String](https://doc.rust-lang.org/std/string/struct.String.html), etc. 

   This is achieved thanks to two implicit actions taken by the compiler:

  - at the root of every crate, the compiler injects an implicit extern crate std;
  - in every module, the compiler injects an implicit `use std::prelude::v1::*;` (for now)
std::prelude::v1 is just a regular module which re-exports those frequently used symbols using the pub use ... syntax. 

   And many libaries will also define a *prelude* module, and import with the same glob import syntax: `use xxx::prelude::*;` <i>***explictly***</i>

---

## Reference 

[Learn Rust With Entirely Too Many Linked Lists](https://rust-unofficial.github.io/too-many-lists/)

[Github repo for the linked lists](https://github.com/rust-unofficial/too-many-lists)
