# Access file system

Well, this part is inspired by a [Deno issue](https://github.com/denoland/deno/issues/2150) and my recent work, which not only for TypeScript but also JavaScript.
It is not only related to Deno, but also nodejs and browsers (It is sometimes different in Chrome and Firefox).

Thus, it will contain the behavior of different ways of file access: `import`, `dynamic import`, `fetch` API, `fs` modules in browsers, nodejs and Deno.

| | Deno | Node | Browser |
|----------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------|------|---------------------------------------------------------------------------------------------------------------------------------------------|
| Import keywork                                                                   |                                                                                                    |      |                                                                                                                                             |
| Import expression (dynamic)                                                    |                                                                                                    |      |                                                                                                                                             |
| [fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)  | Deno has raw browser-like fetch API. And it is considering to have "file://" protocol [Deno issue](https://github.com/denoland/deno/issues/2150) supported | NodeJS does not have standard `fetch`, requires third party like [node-fetch](https://github.com/node-fetch/node-fetch) as polyfill | [Modern browsers](https://github.com/github/fetch#browser-support) has native support for `fetch`. <br/> Requires polyfill for old browsers. |
| fs module                                                                        | ✅  | ✅    | Browser only supports sandbox [file system API](https://developer.mozilla.org/en-US/docs/Web/API/File_and_Directory_Entries_API) |

