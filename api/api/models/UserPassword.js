/**
 * Userpassword.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
var bcrypt = require('bcrypt');

module.exports = {
  tableName: 'user_password',
  attributes: {
    user: {
      model: 'user',
      columnName: 'user_id',
      required: true
    },
    password: {
      type: 'string',
      minLength: 6,
      required: true
    }
  },
  // Here we encrypt password before creating a User
  beforeCreate: function (values, next) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(values.password, salt, function (err, hash) {
        if (err) return next(err);
        values.password = hash;
        next();
      })
    })
  },

  comparePassword: function (myPlaintextPassword, hash, cb) {
    bcrypt.compare(myPlaintextPassword, hash, function (err, match) {
      if (err) cb(err);
      if (match) {
        cb(null, true);
      } else {
        cb(err);
      }
    })
  }
};
