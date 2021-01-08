# Web assembly

Learning notes and practises of web assembly.

---

### Background

[Solomon Hykes](https://www.linkedin.com/in/solomonhykes), the founder of Docker, has posted on Twiter:

![quote docker](https://github.com/GarfieldZHU/Aloha.zone.io/blob/master/wasm/.assets/quote_docker.jpg?raw=true)


### WASI

The [WASI](https://wasi.dev/) (WebAssembly System Interface) is a modular system interface for WebAssembly. Read guide to 


### Runtime

To run the wasm modules out of browser, it requires a runtime to execution the `.wasm` or `.wat` as VM. The runtime typically supports both WASI APIs as well. 

- [wasmer](https://wasmer.io/)

  The wasmer is proud of its performance. 

- [wasmtime](https://wasmtime.dev)
  
  It is a JIT-style runtime. It is now a project in Bytecode Alliance. WASI API is well supported: [WASI tutorial](https://github.com/bytecodealliance/wasmtime/blob/main/docs/WASI-tutorial.md)


> I suppose! wasmer doesn’t have much documentation on writing programs using the WASI API, while wasmtime has enough of a tutorial to get you started.


##### Debating about comparison on the runtimes

- A interesting thread discuss the wasmer vs. wasmtime from Developers: https://github.com/wasmerio/wasmer/issues/142
- [Actually using WASM](https://wiki.alopex.li/ActuallyUsingWasm), examples with wasmer and wasmtime.


### WASM-VDOM

Use wasm for comparing virtual DOM to optimize the performance:

[Virtual DOM by WASM](https://github.com/GarfieldZHU/WA-vDom)

### Rust wasm
[Game of life](./rust-wasm/wasm-game-of-life)
