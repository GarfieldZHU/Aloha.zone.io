// Copyright 2018-2020 @GarfieldZHU. All rights reserved. MIT license.


//----------------------Sample----------------------

/**
 * Memoize a function for its any input parameter
 */ 
const memoize = (f: (...args: any) => any) => {
  const cache = {} as {[key: string]: any}

  return (...args: any) => {
    const strArgs = JSON.stringify(args)
    cache[strArgs] = cache[strArgs] || f.apply(f, args)
    return cache[strArgs]
  }
}

//----------------------Demo----------------------

/**
 * A recursive Fibonacci 
 * Time: O(2^n)
 * Space: O(1)
 * @param n 
 */
const fib = (n: number): number => {
  if (n <= 0) return 0
  if (1 === n || 2 === n) return 1
  return fib(n-1) + fib(n-2)
}
 
const testMemoFib = () => {
  console.log('Step 1: count the time of fibonacci when n=40')
  console.time('Raw Fib: n=40')
  console.log(fib(40))
  console.timeEnd('Raw Fib: n=40')

  {
    const memoFib = memoize(fib)
    console.log('Step 2: count the time of first call of memoized fib')
    console.time('First call Memo Fib: n=40')
    console.log(memoFib(40))
    console.timeEnd('First call Memo Fib: n=40')

    console.time('Another call Memo Fib: n=39')
    console.log(memoFib(39))
    console.timeEnd('Another call Memo Fib: n=39')

    console.time('Second call Memo Fib: n=40')
    console.log(memoFib(40))
    console.timeEnd('Second call Memo Fib: n=40')

    console.time('Second call Memo Fib: n=39')
    console.log(memoFib(39))
    console.timeEnd('Second call Memo Fib: n=39')
  }
  // console.log(memoFib(39))  // Out side the namespace of memoFib, the closure is released as well as the memo results
}


// Just an example, please use the non recusive algorithm with time O(n) space O(1)
const testOptimizeFib = () => {
  // A memo Fibonacci
  const yaFib = (n: number): number => {
    if (n <= 0) return 0
    if (1 === n || 2 === n) return 1
    return memoFib(n-1) + memoFib(n-2)
  }
  const memoFib = memoize(yaFib)

  console.time('Memo recursive Fib: n=40')
  console.log(yaFib(40))
  console.timeEnd('Memo recursive Fib: n=40')
}

testMemoFib()
testOptimizeFib()