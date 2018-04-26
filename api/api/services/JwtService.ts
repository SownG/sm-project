/**
 * jwToken
 *
 * @description :: JSON Webtoken Service for sails
 * @help        :: See https://github.com/auth0/node-jsonwebtoken & http://sailsjs.org/#!/documentation/concepts/Services
 */

const jwt = require('jsonwebtoken')
const crypt = require('crypto')
const tokenSecret = process.env.JWT_TOKEN_SECRET
const CryptoService = require('./CryptoService')

// Generates a token from supplied payload
module.exports.issue = function (user) {
  // If user is admin (role = 1), token's expiration are 5 hours
  const expiration = user.role == 1 ? { expiresIn: 18000 } : { expiresIn: '30 days' }
  const payload = {
    user: CryptoService.encrypt((user.id).toString()),
  }
  return jwt.sign(
    payload,
    process.env.JWT_TOKEN_SECRET, // Tokeny Secret that we sign it with
    expiration 
  );
};

// Verifies token on a request
module.exports.verify = function (token, callback) {
  return jwt.verify(
    token, // The token to be verified
    tokenSecret, // Same token we used to sign
    {}, // No Option, for more see https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback
    callback //Pass errors or decoded token to callback
  );
};
