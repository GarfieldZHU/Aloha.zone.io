# Something tricky in TypeScript


### Interfaces with excess properties

TypeScript lets us pass { size: number; label: string; } to something that only expected a { label: string; }, since TS has a structural subtyping system. But ***inline literal objects does not***.
  
It is caused by [excess properties check](https://www.typescriptlang.org/docs/handbook/interfaces.html#excess-property-checks), 


Play with the [sample](https://www.typescriptlang.org/play/index.html?ssl=21&ssc=3&pln=1&pc=1#code/JYOwLgpgTgZghgYwgAgCIHsDmyDeBYAKGWQCMoIIATALmQGcwpRNCBfZQwmAVxATGDoQyAA5NwGTAApKWWpICUuQsWIIhddABsIAOi1YpAIkm0jyANTJZmXWQqUFbTgXUgGyTM2jIAvMqJVeyozAEFgcko4HSMAGhVVOEwIWgBmZwJCAHos5ABlbgQkOjpaAGForWQAd2AwAAtkOGEANzgmOBIdJpLgTBAqHuQtOuho5HQSACsIfkIxUDBJKS8QZKgnTIIc5AAxOGAtcsqausbQEYHh0ahxyZm5ggWJQ3xA4mCaZCNwyOiIOIJYhJFLIdIEVgKIA)
