
var {User} = require('./../models/user'); 

// middleware to make GET /users/me private
var authenticate = (request, response, next) => {
  var token = request.header('x-auth');

  User.findByToken(token).then((user) => {
    if (!user) {
      return Promise.reject();
    }

    request.user = user;
    request.token = token;
    next();
  }).catch((e) => {
    // user need be authenticated
    response.status(401).send(e);
  });
};

module.exports = {authenticate};