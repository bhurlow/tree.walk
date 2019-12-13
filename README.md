
🌲
### tree.walk

An implementation of clojure's [walk](https://clojure.github.io/clojure/clojure.walk-api.html) functions for javascript. Use this for generic tree traversal operations over nested objects and arrays. 


#### example 

```sh
npm install --save-dev @bhurlow/tree.walk
yarn add @bhurlow/tree.walk
```

`postwalk` performs a depth-first post-order traversal of the provided (possibly nested) data structure. Uses provided function's return value in place of the original

```js
const { postwalk } = require('./index')

const input = [[1, 2], [3, [4, 5]]]

const res = postwalk(
  val => {
    if (typeof val == 'number') {
      return val * 5
    }
    return val
  },
  input
)

=> [ [ 5, 10 ], [ 15, [ 20, 25 ] ] ]
```

#### API


```js
walk(inner, outer, form)
```
applies `inner` to the innermost items in the collection, and `outer` to the wrapping whole


```js
postwalk(f, form)
```
depth-first post-order


```js
prewalk(f, form)
```
depth-first pre-order
