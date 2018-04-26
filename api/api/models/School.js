/**
 * School.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    name: {
      type: 'string',
      required: true
    },
    address: {
      type: 'string',
      required: true
    },
    email: {
      type: 'string',
      unique: true,
      required: true
    },
    phone: {
      type: 'string',
      unique: true,
      required: true
    },
    logo: {
      type: 'string'
    },
    background_image: {
      type: 'string'
    },
    primary_color: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    school_level: {
      type: 'string',
      isIn: ['1', '2', '3', '4'],
      defaultsTo: '4'
    }
  }
};
