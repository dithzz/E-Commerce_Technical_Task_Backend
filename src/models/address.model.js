const mongoose = require('mongoose')
const { toJSON, paginate } = require('./plugins')

const addressSchema = mongoose.Schema(
   {
      line1: {
         type: String,
      },
      line2: {
         type: String,
         default: '',
      },
      district: {
         type: String,
      },
      state: {
         type: String,
      },
      country: {
         type: String,
      },
      pincode: {
         type: String,
      },
      default: {
         type: Boolean,
      },
   },
   {
      timestamps: true,
   },
)

// add plugin that converts mongoose to json
addressSchema.plugin(toJSON)
addressSchema.plugin(paginate)

/**
 * @typedef Token
 */
const Address = mongoose.model('Address', addressSchema)

module.exports = Address
