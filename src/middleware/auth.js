const jwt = require('jsonwebtoken')
const bookModel = require('../models/booksModel')



const authentication = async function (req,res,next){

    try{
        let token = req.headers["x-api-key"];

        if (!token) {
            return res.status(400).send({ status: false, msg: "token must be present" });
        }
        let decodedToken = jwt.verify(token, "secret-key",{ignoreExpiration:true});
        let exp = decodedToken.exp
        let iatNow = Math.floor(Date.now() /1000)
        if(exp>iatNow) return res.status(401).send({status:false,msg:"token is expired now"})
        if (!decodedToken) {
            return res.status(404).send({ status: false, msg: "token is invalid" });
        }
        next()
    }
    catch (err) {
       return res.status(500).send({ status: false, msg: err.message })
    }


}

const authorize = async function(req,res,next){
    try{
        let bookId = req.params.bookId 
        let token = req.headers["x-api-key"]
        let decodedToken = jwt.verify(token,"secret-key")
        if(!bookId){
            bookId = req.body.bookId 
        }

        if(!bookId){
            return res.status(400).send({status:false,msg:"bookId is required"})
        }
        let book = await bookModel.findOne({_id:bookId})
        if(!book) return res.status(404).send({status:false,msg:"that bookId not present in in database"})
        let authorValid= decodedToken.authorId
        if(authorValid != book.userId){
            return res.status(401).send({status:false,msg:"you are not authorized to make to change"})
        }
        next()

    }
    catch(err){
        return res.send(500).send({status:false,msg: err.message})
    }
}

module.exports.authentication = authentication
module.exports.authorize = authorize
