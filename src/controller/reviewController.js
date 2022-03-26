const reviewModel = require('../models/reviewModel')
const objectId = require('mongoose').Schema.Types.ObjectId


const isValid = function (value) {
    if (typeof value == 'undefined' || value === null) return false
    if (typeof value == 'string' && value.trim().length === 0) return false
    return true
}

const createReview = async function(req,res){
    try{
        let reviewData = req.body
        let {bookId,reviewedBy,reviewedAt,rating} = reviewData
    
        if(!isValid(bookId)){
            return res.status(400).send({status:false,msg:"bookId is required"})
    
        }
        if(!objectId.isValid(bookId)){
            return res.status(400).send({status:false,msg:"bookId is invalid"})
    
        }
        if(!isValid(reviewedBy)){
            return res.status(400).send({status:false,msg:"reviewer name  is required"})
    
        }
        if(!isValid(reviewedAt)){
            return res.status(400).send({status:false,msg:"date  is required"})
    
        }
        if(!isValid(rating)){
            return res.status(400).send({status:false,msg:"rating is required"})
    
        }
        //min and max rating 
        let data = await reviewModel.create(reviewData)
        let result = {
            _id:data._id,
            bookId:data.bookId,
            reviewedBy:data.reviewedBy,
            reviewedAt:data.reviewedAt,
            rating:data.rating,
            review:data.review
    
    
        }
        return res.status(200).send({status:false,data:result})
    
    
    }
    catch(err){
        return res.status(500).send({status:false,msg: err.message})
    }
}



module.exports.createReview = createReview