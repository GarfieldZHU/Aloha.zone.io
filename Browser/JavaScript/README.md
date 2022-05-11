# JavaScript

Advanced knowledge about JS


### Useful APIs

#### Deep clone objects

Use new API [structuredClone](https://developer.mozilla.org/en-US/docs/Web/API/structuredClone) to deep clone the objects.

The best alternative of the old ways:

- Use JSON: `JSON.parse(JSON.stringify(obj))` 
- Use **lodash**: `_.deepClone(obj)`

```js
const deepCopy = structuredClone(obj)

const shallowCopy = { ...obj }
```

### Reference
[AST explorer](https://astexplorer.net/)
