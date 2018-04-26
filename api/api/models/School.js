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
      isEmail: true,
      required: true
    },
    phone: {
      type: 'string',
      unique: true,
      required: true
    },
    logo: {
      type: 'string',
      isURL: true,
      allowNull: true
    },
    background_image: {
      type: 'string',
      isURL: true,
      allowNull: true
    },
    primary_color: {
      type: 'string',
      maxLength: 6,
      allowNull: true,
    },
    description: {
      type: 'string',
      allowNull: true
    },
    acronym: {
      type: 'string',
      allowNull: true
    },
    school_level: {
      type: 'string',
      isIn: ['1', '2', '3', '4'],
      defaultsTo: '4'
    }
  }
};
