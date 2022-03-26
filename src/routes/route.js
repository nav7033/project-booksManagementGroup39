const express = require('express')
const router = express.Router()
const userController = require('../controller/userControlller')
const bookController = require('../controller/booksController')


router.post('/register',userController.createUser)

router.post('/login',userController.loginUser)
router.post('/books',bookController.createBook)
router.get('/books',bookController.getBooks)









module.exports = router