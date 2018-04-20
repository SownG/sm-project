/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
var bcrypt = require('bcrypt');

module.exports = {
  attributes: {
    first_name: {
      type: 'string',
      required: true
    },
    last_name: {
      type: 'string',
      required: true
    },
    sex: {
      type: 'string',
      isIn: ['male', 'female'],
      defaultsTo: 'male'
    },
    dob: {
      type: 'string',
      required: true
    },
    address: {
      type: 'string',
      required: true
    },
    type: {
      type: 'string',
      isIn: ['student', 'employee', 'parent'],
      defaultsTo: 'employee'
    },
    email: {
      type: 'string',
      unique: true
    },
    phone: {
      type: 'string',
      unique: true
    },
    job: {
      type: 'string'
    },
    'identification_number': {
      type: 'string'
    },
    school_id: {
      model: 'school'
    },
    role_id: {
      model: 'role',
    },
    is_active: {
      type: 'boolean',
      defaultsTo: false
    },
    password: {
      type: 'string',
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

  comparePassword: function (password, user, cb) {
    bcrypt.compare(password, password, function (err, match) {
      if (err) cb(err);
      if (match) {
        cb(null, true);
      } else {
        cb(err);
      }
    })
  }
};
