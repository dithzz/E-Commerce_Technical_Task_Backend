const express = require('express')
const { appController } = require('../../controllers')
const auth = require('../../middlewares/auth')
const upload = require('../../middlewares/upload')

const router = express.Router()

// Books
router.route('/add-book').post(appController.addBook)
router.route('/books').get(appController.getAllBooks)
router
   .route('/book/:bookId')
   .get(appController.getSingleBooks)
   .post(appController.deleteBook)
   .patch(appController.updateBook)

// Cart
router.route('/add-to-cart').post(auth(), appController.addItemToCart)
router.route('/cart').get(auth(), appController.getCart)
router.route('/remove-from-cart').post(auth(), appController.removeItemFromCart)
router.route('/checkout-cart').post(auth(), appController.checkoutCart)

module.exports = router
