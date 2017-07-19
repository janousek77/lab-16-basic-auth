'use strict';


const User = require('../model/user.js');

module.exports = (req, res, next) => {
  const {authorization} = req.headers;

  if(!authorization)
    return next(new Error('unauthorized no authorization provieded'));

  let encoded = authorization.split('Basic ')[1];
  if(!encoded)
    return next(new Error('unauthorized no basic auth provieded'));

  let decoded = new Buffer(encoded, 'base64').toString();
  let [username, password] = decoded.split(':');

  if(!username || !password)
    return next(new Error('unauthorized username or password was missing'));

  // console.log('decoded', decoded);
  // console.log('username', username);
  // console.log('password', password);

  User.findOne({username})
    .then(user => {
      if(!user)
        return next(new Error('unauthorized user does not exist'));
      return user.passwordHashCompare(password);
    })
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => {
      console.log('error', err);
      next(new Error('unauthorized find one failed in basic auth middleware'));
    });

};
