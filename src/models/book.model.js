const mongoose = require('mongoose')
const { toJSON, paginate } = require('./plugins')

const bookSchema = mongoose.Schema(
   {
      price: {
         type: Number,
      },
      title: {
         type: String,
      },
      stock: {
         type: Number,
      },
      brand: {
         type: String,
      },
      description: {
         type: String,
      },
      image: {
         type: String,
         default: 'https://ashmagautam.files.wordpress.com/2013/11/mcj038257400001.jpg',
      },
      totalSales: {
         type: Number,
         default: 0,
      },
   },
   {
      timestamps: true,
   },
)

// add plugin that converts mongoose to json
bookSchema.plugin(toJSON)
bookSchema.plugin(paginate)

/**
 * @typedef Token
 */
const Book = mongoose.model('Book', bookSchema)

module.exports = Book
