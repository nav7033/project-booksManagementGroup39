const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')
const bookController = require('../controller/booksController')
const reviewController = require('../controller/reviewController')
const {authentication,authorize} = require('../middleware/auth')

//user Api
router.post('/register',userController.createUser)
router.post('/login',userController.loginUser)
//book api
router.post('/books',authentication, bookController.createBook)
router.get('/books',authentication, bookController.getBooks)
router.get('/books/:bookId',authentication, bookController.getBookReview)
router.put('/books/:bookId',authentication, authorize, bookController.updateBook)
router.delete('/books/:bookId',authentication,authorize, bookController.deleteBook)
//review api
router.post('/books/:bookId/review', reviewController.createReview)
router.put('/books/:bookId/review/:reviewId',reviewController.reviewUpdate)
router.delete('/books/:bookId/review/:reviewId',reviewController.reviewDelete)








module.exports = router