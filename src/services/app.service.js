const httpStatus = require('http-status')
const userService = require('./user.service')
const ApiError = require('../utils/ApiError')
const { Book, Author, Cart, User, Review, Settings } = require('../models')

/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUserWithEmailAndPassword = async (email, password) => {
   const user = await userService.getUserByEmail(email)
   if (!user || !(await user.isPasswordMatch(password))) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password')
   }
   return user
}

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryBooks = async (filter, options) => {
   const populate = 'category, author'
   const books = await Book.paginate(filter, { populate, ...options })
   return books
}

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryAuthors = async (filter, options) => {
   const authors = await Author.paginate(filter, options)
   return authors
}

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const getCartById = async (cartId) => {
   return Cart.findById(cartId)
}

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateCartById = async (cartId, updateBody) => {
   return Cart.findByIdAndUpdate(cartId, updateBody)
}

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const createReview = async (reviewBody) => {
   return Review.create({ ...reviewBody })
}

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateWishlist = async (userId, updateBody) => {
   return User.findByIdAndUpdate(userId, updateBody)
}

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateBook = async (bookId, updateBody, review) => {
   const book = await Book.findById(bookId)
   const count = book.rating ? book.rating.count + 1 : 1
   const rating = book.rating ? book.rating.star : 0
   const star = +((updateBody.rating + rating) / count).toFixed(1)
   Object.assign(book, { ...updateBody, rating: { count, star }, reviews: [...book.reviews, review.id] })
   await book.save()
}

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateBookSold = async (body) => {
   body.items.map(async (item) => {
      await Book.findByIdAndUpdate(item.item, { $inc: { totalSales: item.count, stock: -item.count } })
   })
   return []
}

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateSettings = async (settingId, updateBody) => {
   const settings = await Settings.findById(settingId)
   Object.assign(settings, { ...updateBody })
   await settings.save()
}

module.exports = {
   loginUserWithEmailAndPassword,
   queryBooks,
   queryAuthors,
   createReview,
   updateCartById,
   getCartById,
   updateWishlist,
   updateBook,
   updateBookSold,
   updateSettings,
}
