const express = require('express')
const router = express.Router()
const removeUploadedFiles = require('multer/lib/remove-uploaded-files');
const userController = require('../controller/userController')
const bookController = require('../controller/booksController')
const reviewController = require('../controller/reviewController')
const { authentication, authorize } = require('../middleware/auth')
const aws = require('aws-sdk')

aws.config.update(
    {
        accessKeyId: "AKIAY3L35MCRVFM24Q7U",
        secretAccessKey: "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",
        region: "ap-south-1"
    }
)

let uploadFile = async (file) => {
    return new Promise( function(resolve, reject) {
        //this function will upload file to aws and return the link
        let s3 = new aws.S3({ apiVersion: "2006-03-01" }) //we will be using s3 service of aws
       
        var uploadParams = {
            ACL: "public-read",
            Bucket: "classroom-training-bucket", // HERE
            Key: "booksCover/" + file.originalname, // HERE 
            Body: file.buffer
        }

      s3.upload(uploadParams, function (err, data) {
            if (err) { 
                return reject({ "error": err }) 
            }

            console.log(data)
            console.log(" file uploaded successfully ")
            return resolve(data.Location) // HERE
          }
        ) }
    )
}
router.post('/write-file-aws', async function (req, res) {
    try {
        let files = req.files
        if (files && files.length > 0) {
            //upload to s3 and get the uploaded link
            
            let uploadedFileURL = await uploadFile(files[0])
            return res.status(201).send({status:true,msg:"file uploaded successfully" ,data:uploadedFileURL})
            
        }
        else {
            res.status(400).send({ msg: "No file found" })
        }
    }
    catch (err) {
        res.status(500).send({ msg: err })
    }
}
)


//user Api
router.post('/register', userController.createUser)
router.post('/login', userController.loginUser)
//book api
router.post('/books', authentication, bookController.createBook)
router.get('/books', authentication, bookController.getBooks)
router.get('/books/:bookId', authentication, bookController.getBookReview)
router.put('/books/:bookId', authentication, authorize, bookController.updateBook)
router.delete('/books/:bookId', authentication, authorize, bookController.deleteBook)
//review api
router.post('/books/:bookId/review', reviewController.createReview)
router.put('/books/:bookId/review/:reviewId', reviewController.reviewUpdate)
router.delete('/books/:bookId/review/:reviewId', reviewController.reviewDelete)








module.exports = router

