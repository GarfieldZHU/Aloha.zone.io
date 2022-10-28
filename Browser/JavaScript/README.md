# JavaScript

Advanced knowledge about JS


### Useful APIs

#### Deep clone objects

Use new API [structuredClone](https://developer.mozilla.org/en-US/docs/Web/API/structuredClone) to deep clone the objects.

The best alternative of the old ways:

- Use JSON: `JSON.parse(JSON.stringify(obj))` 
- Use **lodash**: `_.cloneDeep(obj)`

```js
const deepCopy = structuredClone(obj)

const shallowCopy = { ...obj }
```

### Performance

#### `JSON.parse` is faster than literal objects

Compare the two object assignment statements below, which is faster?

- Literal object:
  ```js
  const data = { foo: 42, bar: 1337 }; // 🐌
  ```
- The JSON-stringiefied form:
  ```js
  const data = JSON.parse('{"foo":42,"bar":1337}'); // 🚀
  ```
  The `JSON.parse` is [much faster](https://github.com/GoogleChromeLabs/json-parse-benchmark) than the literal object above. 
  
  Because the JSON parser is more simple and naive than the Javascript parser. 
  
  **A good rule of thumb is to apply this technique for objects of 10 kB or larger**

See this [V8 blog](https://v8.dev/blog/cost-of-javascript-2019#json), and the [Chrome Dev Summit 2019](https://youtu.be/ff4fgQxPaO0)

### Reference
[AST explorer](https://astexplorer.net/)
