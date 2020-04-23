// Copyright 2018-2020 @GarfieldZHU. All rights reserved. MIT license.

import curry from "https://deno.land/x/denofun/lib/curry.ts";


//----------------------Exercise----------------------

console.log('add', map(add(2)))


// Exercise 1
// Use partial apply to simplify:

// const words = function(str) {
//   return split(' ', str)
// }
//==============

const words = split(' ')

// Exercise 1a
// Use `map` to create a new `words` method

//sentences = undefined
//==============

const sentences = map(words)


// Exercise 2
// Use partial apply to simplify:

// function filterQs (xs: string) {
//   return filter(function(x){ return match(/q/i, x);  }, xs)
// }

//==============

const filterQs = filter(match(/q/i))


// Exercise 3
// Use the helper function _keepHighest to refactor max

const _keepHighest = function(x: number, y: number) { return x >= y ? x : y } // <- leave be

// function max(xs: string) {
//   return reduce(function(acc, x){
//     return _keepHighest(acc, x)
//   }, -Infinity, xs)
// }

//==============

const max = reduce(_keepHighest, -Infinity)


// Bonus 1:
// wrap array's slice to be functional and curried.
// //[1,2,3].slice(0, 2)
// ============
const slice = curry(function(start: number, end: number, xs: string){ return xs.slice(start, end); })


// Bonus 2:
// use slice to define a function "take" that takes n elements. make it curried
// ============
const take = slice(0)


