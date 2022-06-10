const mongoose = require('mongoose')
const { toJSON } = require('./plugins')

const orderSchema = mongoose.Schema(
   {
      items: [{ item: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true }, count: { type: Number } }],
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      purchasedOn: {
         type: Date,
         default: new Date(),
      },
      promotionApplied: {
         type: Boolean,
         default: false,
      },
      couponApplied: {
         type: Boolean,
         default: false,
      },
      totalAmount: {
         type: Number,
         required: true,
      },
   },
   {
      timestamps: true,
   },
)

// add plugin that converts mongoose to json
orderSchema.plugin(toJSON)

/**
 * @typedef Token
 */
const Order = mongoose.model('Order', orderSchema)

module.exports = Order
