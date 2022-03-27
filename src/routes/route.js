const express = require('express')
const router = express.Router()
const userController = require('../controller/userControlller')
const bookController = require('../controller/booksController')
const reviewController = require('../controller/reviewController')


router.post('/register',userController.createUser)

router.post('/login',userController.loginUser)
router.post('/books',bookController.createBook)
router.post('/reviews',reviewController.createReview)
router.get('/books',bookController.getBooks)
router.get('/books/:bookId',bookController.getBookReview)
router.put('/books/:bookId',bookController.updateBook)
router.delete('/books/:bookId',bookController.deleteBook)










module.exports = router