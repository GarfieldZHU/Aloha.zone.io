// Copyright 2018-2020 @GarfieldZHU. All rights reserved. MIT license.

// 1. Use `add` and `map` to make a function that increments a value inside a functor
//==============
const incrF = map(add(1))


// 2. Use `safeProp` and `head` to find the first initial of the user
// initial :: User -> Maybe String
//==============
const initial = compose(
  map(head),
  safeProp('name')
)


// 3. Write a function uses `checkActive` and `showWelcome` to grant access or return the error
//   const showWelcome = compose(append('Welcom), prop('name))
//
//   const checkActive = function checkActive(user: User) {
//     return user.active ? Either.of(user) : left('Your account is not active)
//   }
//==============
const eitherWelcome = compose(
  map(showWelcome)
  checkActive
)


// 4. Write a function which checks whether a user has a name longer than 3 characters or return an error message.abs
//   const validateUser = curry((validate, user) => validate(user).map(_ => user))
//   const save = user => new IO(() => ({ ...user, saved: true }))
//==============
const validateName = ( {name} ) => (name.length > 3
  ? Either.of(null)
  : left('Your name need to be > 3')
)

const register = compose(
  either(IO.of, compose(map(showWelcome), save))
  validateUser(validateName)
)