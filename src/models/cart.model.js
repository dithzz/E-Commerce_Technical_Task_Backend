const mongoose = require('mongoose')
const { toJSON } = require('./plugins')

const cartSchema = mongoose.Schema(
   {
      items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
      promotionApplied: {
         type: String,
      },
      availableCoupons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Coupon' }],
   },
   {
      timestamps: true,
   },
)

// add plugin that converts mongoose to json
cartSchema.plugin(toJSON)

/**
 * @typedef Token
 */
const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart
