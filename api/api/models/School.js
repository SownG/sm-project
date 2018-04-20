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
      required: true
    },
    phone: {
      type: 'string',
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
    plan: {
      type: 'string',
      required: true
    },
    school_level: {
      type: 'number',
      required: true
    }
  }
};
