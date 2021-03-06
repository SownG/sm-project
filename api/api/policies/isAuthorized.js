/**
 * isAuthorized
 *
 * @description :: Policy to check if user is authorized with JSON web token
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Policies
 */
import { decrypt } from "../services/CryptoService";

module.exports = function (req, res, next) {
  var token;

  if (req.headers && req.headers.authorization) {
    var parts = req.headers.authorization.split(' ');
    if (parts.length == 2) {
      var scheme = parts[0],
        credentials = parts[1];

      if (/^Bearer$/i.test(scheme)) {
        token = credentials;
      }
    } else {
      return res.json(401, { error: 'Format is Authorization: Bearer [token]' });
    }
  } else if (req.param('token')) {
    token = req.param('token');
    // We delete the token from param to not mess with blueprints
    delete req.query.token;
  } else {
    return res.json(401, { error: 'No Authorization header was found' });
  }

  JwtService.verify(token, function (err, token) {
    if (err) return res.json(401, { error: 'Invalid Token!' });
    // console.log(decrypt(token.user))
    // sails.models.user.findOne({
    //   id: decrypt(token.user)
    // }).exec((err, user) => {
    //   if (err) return res.serverError(err);
    //   req.user = user;
    //   next()
    // })
    req.user = decrypt(token.user);
    next()
  });
};
