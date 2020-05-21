# Access file system

Well, this part is inspired by a [Deno issue](https://github.com/denoland/deno/issues/2150) and my recent work, which not only for TypeScript but also JavaScript.
It is not only related to Deno, but also nodejs and browsers (It is sometimes different in Chrome and Firefox).

Thus, it will contain the behavior of different ways of file access: `import`, `dynamic import`, `fetch` API, `fs` modules in browsers, nodejs and Deno.

| | Deno | Node | Browser |
|----------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------|------|---------------------------------------------------------------------------------------------------------------------------------------------|
| Import keywork                                                                   |                                                                                                    |      |                                                                                                                                             |
| Import expression (dynamic)                                                    |                                                                                                    |      |                                                                                                                                             |
| [fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)  | Not support "file://" protocol yet [Deno issue](https://github.com/denoland/deno/issues/2150) |      |                                                                                                                                             |
| fs module                                                                        |                                                                                                    | ✅    | Browser only supports sandbox [file system API](https://developer.mozilla.org/en-US/docs/Web/API/File_and_Directory_Entries_API) |

