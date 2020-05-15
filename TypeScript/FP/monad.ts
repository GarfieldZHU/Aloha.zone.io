// Copyright 2018-2020 @GarfieldZHU. All rights reserved. MIT license.

// 1. Use `safeProp` and `map/join` or `chain` to safety get the street name when given a user
// getStreetName :: User -> Maybe String
const getStreetName = compose(
  chain(safeProp('name')),
  chain(safeProp('street')),
  safeProp('address'),
)


// 2. Use the getFile to get the file path
//   const getFile = IO.of('/home/mostly-adequate/ch09.md')
//   const pureLog = str => new IO(() => console.log(str))
//   logFileName :: IO()
const basename = compose(last, split('/'))
const logFilename = compose(
  chain(purelog),
  map(baseName)
)(getFile)


// 3. Create a function which adds a new email to the mailing list if valid and then notify the whole list
//   validateEmail :: Email -> Either String Email
//   addToMailingList :: Email -> IO([Email])
//   emailBlast :: [Email] -> IO()
const joinMailingList = compose(
  map(compose(chain(emailBlast), addToMailingList)),
  validateEmail
)
