/* global __basedir */
const httpStatus = require('http-status')
const moment = require('moment')
const readXlsxFile = require('read-excel-file/node')
const { Author, Category, Book, Cart, Order, User, Settings } = require('../models')
const { appService } = require('../services')
const catchAsync = require('../utils/catchAsync')
const pick = require('../utils/pick')

const addBook = catchAsync(async (req, res) => {
   const book = new Book(req.body)
   await book.save()
   res.status(httpStatus.ACCEPTED).send({ message: 'success', payload: book })
})

const updateBook = catchAsync(async (req, res) => {
   const book = await Book.findById(req.params.bookId)
   Object.assign(book, req.body)
   await book.save()
   res.status(httpStatus.ACCEPTED).send({ message: 'success', payload: book })
})

const getAllBooks = catchAsync(async (req, res) => {
   const { search } = req.query
   const filter = pick({ $or: { title: search }, archive: false }, [])
   const options = pick(req.query, ['sortBy', 'limit', 'page'])
   const result = await appService.queryBooks(filter, options)
   res.send({ message: 'success', payload: result })
})

const getSingleBooks = catchAsync(async (req, res) => {
   const book = await Book.findById(req.params.bookId).populate('author category reviews')
   res.status(httpStatus.ACCEPTED).send({ message: 'success', payload: book })
})

const deleteBook = catchAsync(async (req, res) => {
   await Book.findByIdAndDelete(req.params.bookId, { archive: true })
   res.status(httpStatus.ACCEPTED).send({ message: 'success' })
})

const getCart = catchAsync(async (req, res) => {
   const cart = await Cart.findById(req.user.cart).populate('items')
   res.send({ message: 'success', payload: cart })
})

const addItemToCart = catchAsync(async (req, res) => {
   // const user = await userService.getUserById(req.user)
   await appService.updateCartById(req.user.cart, { $push: { items: req.body.item } })
   res.send({ message: 'success' })
})

const removeItemFromCart = catchAsync(async (req, res) => {
   await appService.updateCartById(req.user.cart, { $pull: { items: req.body.item } })
   res.send({ message: 'success' })
})

const checkoutCart = catchAsync(async (req, res) => {
   const user = await User.findById(req.user)
   const order = new Order({ ...req.body, userId: req.user.id })
   await order.save()
   await appService.updateBookSold(req.body)
   // const book = await Book.updateMany({_id: {$in: req.body.items}},{$dev:{totalSales: }})
   res.send({ message: 'success' })
})
module.exports = {
   addBook,
   getAllBooks,
   getSingleBooks,
   getCart,
   addItemToCart,
   removeItemFromCart,
   deleteBook,
   checkoutCart,
   updateBook,
}
