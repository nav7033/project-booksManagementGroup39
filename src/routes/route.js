const express = require('express')
const router = express.Router()
const userController = require('../controller/userControlller')
const bookController = require('../controller/booksController')
const reviewController = require('../controller/reviewController')


router.post('/register',userController.createUser)

router.post('/login',userController.loginUser)
router.post('/books',bookController.createBook)

router.get('/books',bookController.getBooks)
router.get('/books/:bookId',bookController.getBookReview)
router.put('/books/:bookId',bookController.updateBook)
router.delete('/books/:bookId',bookController.deleteBook)
router.post('/books/:bookId/review',reviewController.createReview)

router.put('/books/:bookId/review/:reviewId',reviewController.reviewUpdate)
router.delete('/books/:bookId/review/:reviewId',reviewController.reviewDelete)








module.exports = router