// Copyright 2018-2020 @GarfieldZHU. All rights reserved. MIT license.

import curry from "https://deno.land/x/denofun/lib/curry.ts";


//----------------------Exercise----------------------

console.log('add', map(add(2)));


// Exercise 1
//==============

const words = split(' ');

// Exercise 1a
//==============

const sentences = map(words);


// Exercise 2
//==============

const filterQs = filter(match(/q/i));


// Exercise 3
//==============
// Use the helper function _keepHighest to refactor max

const _keepHighest = function(x, y) { return x >= y ? x : y; }; // <- leave be

const max = reduce(_keepHighest, -Infinity);


// Bonus 1:
// ============
// wrap array's slice to be functional and curried.
// //[1,2,3].slice(0, 2)
const slice = _.curry(function(start, end, xs){ return xs.slice(start, end); });


// Bonus 2:
// ============
// use slice to define a function "take" that takes n elements. make it curried
const take = slice(0);


