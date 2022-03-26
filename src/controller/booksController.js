const bookModel = require('../models/booksModel')
const objectId = require('mongoose').Schema.Types.ObjectId

const isValid = function (value) {
    if (typeof value == 'undefined' || value === null) return false
    if (typeof value == 'string' && value.trim().length === 0) return false
    return true
}

const createBook = async function (req, res) {
    try {
        let bookData = req.body
        if (Object.keys(bookData) == 0) {
            return res.status(400).send({ status: false, msg: "booDetails is required " })
        }
        if (!isValid(bookData.title)) {
            return res.status(400).send({ status: false, msg: "required title " })

        }
        let dupTitle = await bookModel.findOne({ title: bookData.title })
        if (dupTitle) {
            return res.status(400).send({ status: false, msg: "this title is already register" })
        }
        if (!isValid(bookData.userId)) {
            return res.status(400).send({ status: false, msg: "userId required" })
        }
        if (!objectId.isValid(bookData.userId)) {
            return res.status(400).send({ status: false, msg: "userId is invalid " })
        }
        if (!isValid(bookData.userId)) {
            return res.status(400).send({ status: false, msg: "userId required" })
        }
        if (!isValid(bookData.ISBN)) {
            return res.status(400).send({ status: false, msg: "ISBN required" })
        }
        let dupIsbn = await bookModel.find({ ISBN: bookData.ISBN })
        if (dupIsbn) {
            return res.status(400).send({ status: false, msg: "please fill unique ISBN" })
        }
        if (!isValid(bookData.category)) {
            return res.status(400).send({ status: false, msg: "category required" })
        }
        if (!isValid(bookData.subcategory)) {
            return res.status(400).send({ status: false, msg: "subcategory required" })
        }
        if (!isValid(bookData.releasedAt)) {
            return res.status(400).send({ status: false, msg: "released date required" })
        }
        let data = await bookModel.create(bookData)
        let result = {
            _id: data._id,
            title: data.title,
            excerpt: data.excerpt,
            userId: data.userId,
            ISBN: data.ISBN,
            category: data.category,
            subcategory: data.subcategory,
            deleted: data.deleted,
            reviews: data.reviews,
            deletedAt: data.deletedAt,
            releasedAt: data.releasedAt,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt
        }
        return res.status(200).send({ status: true, data: result })
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}
const getBooks = async function(req,res){
   try{
    let {userId,category,subcategory}  = req.query
    let getData = await bookModel.find({isDeleted:false})
    if(!getData){
        return res.status(404).send({status:false,msg:"no data found"})
    }
    let result = {
        _id:getData._id,
      title:getData.title,
      excerpt:getData.excerpt,
      userId:getData.userId,
      category:getData.category,
      reviews:getData.reviews,
      releasedAt:getData.releasedAt

    }
    return res.status(200).send({status:true,message:"books list",data:result})
    let getDataFilter = await bookModel.find({userId:userId,category:category,subcategory:subcategory,isDeleted:false}).sort({title:-1})
    if(!getDataFilter){
        return res.status(404).send({status:false,msg:"no data found"})
    }
    let resultBook = {
        _id:getData._id,
      title:getData.title,
      excerpt:getData.excerpt,
      userId:getData.userId,
      category:getData.category,
      reviews:getData.reviews,
      releasedAt:getData.releasedAt

    }
    return res.status(200).send({status:true,message:"books list",data:resultBook})

   }
   catch(err){
       return res.status(500).send({status:false,msg: err.message})

   }

}

module.exports.createBook = createBook
module.exports.getBooks = getBooks