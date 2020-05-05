// Copyright 2018-2020 @GarfieldZHU. All rights reserved. MIT license.

import compose from 'https://deno.land/x/denofun/lib/curry.ts"
// import _ from 'ramda'

//----------------------Exercise----------------------

// Exercise 1
// Rewrite the function using `compose()`

// const isLastInStock = (cars: any) => {
//   const last_car = _.last(cars)
//   return _.prop('in_stock', last_car)
// }
//==============
// const isLastInStock = _.compose(_.prop('in_stock'), _.last())
const isLastInStock = compose(_.prop('in_stock'), _.last())