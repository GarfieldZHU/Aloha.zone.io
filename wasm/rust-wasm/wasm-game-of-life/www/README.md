# Game of Life

This is the browser playground for the Rust/WebAssembly Game of Life crate. The page uses the modern `wasm-pack` web target and native browser ES modules, so it does not need the old webpack template.

From `wasm/rust-wasm/wasm-game-of-life`, build the package and static site with:

```bash
wasm-pack build --release --target web --out-dir www/pkg
cd www
npm run build
```

The deployable site is written to `www/dist/wasm-game-of-life`, which keeps the GitHub Pages URL at `/Aloha.zone.io/wasm-game-of-life/`.
