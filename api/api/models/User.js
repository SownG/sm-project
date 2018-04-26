/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

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
      unique: true,
      isEmail: true,
      required: true
    },
    phone: {
      type: 'string',
      unique: true,
      required: true
    },
    'identification_number': {
      type: 'string'
    },
    school: {
      model: 'school',
      columnName: 'school_id'
    },
    role: {
      model: 'role',
      columnName: 'role_id'
    },
    is_active: {
      type: 'boolean',
      defaultsTo: false
    },
    avatar: {
      type: 'string',
      isURL: true,
      allowNull: true
    },
    verify_code: {
      type: 'string',
      allowNull: true
    },
    last_login: {
      type: 'string',
      allowNull: true
    }
  },
};
