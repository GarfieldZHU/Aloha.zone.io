# Something tricky in TypeScript


### Interfaces with excess properties

TypeScript lets us pass { size: number; label: string; } to something that only expected a { label: string; }, since TS has a structural subtyping system. But ***inline literal objects does not***.
  
It is caused by [excess properties check](https://www.typescriptlang.org/docs/handbook/interfaces.html#excess-property-checks), 


Play with the [sample](https://www.typescriptlang.org/play/index.html?ssl=21&ssc=3&pln=1&pc=1#code/JYOwLgpgTgZghgYwgAgCIHsDmyDeBYAKGWQCMoIIATALmQGcwpRNCBfZQwmAVxATGDoQyAA5NwGTAApKWWpICUuQsWIIhddABsIAOi1YpAIkm0jyANTJZmXWQqUFbTgXUgGyTM2jIAvMqJVeyozAEFgcko4HSMAGhVVOEwIWgBmZwJCAHos5ABlbgQkOjpaAGForWQAd2AwAAtkOGEANzgmOBIdJpLgTBAqHuQtOuho5HQSACsIfkIxUDBJKS8QZKgnTIIc5AAxOGAtcsqausbQEYHh0ahxyZm5ggWJQ3xA4mCaZCNwyOiIOIJYhJFLIdIEVgKIA)

### Classes (nominal typing)

Also caused by structural typing. If class A and class B share the same members, the functions which require an instance of A, also accepts B as legal parameter.

Try the [sample](https://www.typescriptlang.org/play/index.html#code/MYGwhgzhAEAiD2BzaBvAUNT0BGAnApvgCYBc0EALrgJYB2iGWw8tluArsBfLgBR6FS5KnUQBKVIyxYKAC2oQAdAOLQAvDgLEp0AL5p9aAGbtaXai2gAHGrQoJEvIkjIOJ6ac1bwQ+RSCReACIHMiDoAGpoZ0RlLSIxAzQ0UEgYAGEwCklpFSE2UR0vNk5uPjyyAvp3HWk5BTjBdU1BHX1DYuyIWUgKMGbafAB3aEyKYIBZMDp8UfgWIMSAeiXoAGV2GwVREABPABpoAAMtuwcj6DAQCHhL4GB8KwoYfuAs6DpKMDN8NFP7QLdXpgMRAA)


### References

[TypeScript’s quirks: How inconsistencies make the language more complex](https://blog.asana.com/2020/01/typescript-quirks/)
