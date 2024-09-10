const path = require('path')

const {StatusCodes} = require('http-status-codes')
const { BadRequestError } = require('../errors')

const cloudinary = require('cloudinary').v2
const fs = require('fs')

const uploadProductImageLocal = async(req,res) =>{
    if(!req.files){
        throw new BadRequestError('No File Uploaded')
    }
    const productImage = req.files.image;
    if(!productImage.mimetype.startsWith('image')){
        throw new BadRequestError('Please Upload Image')
    }
    const maxSize = 1024 * 1024;
    if(productImage.size > maxSize){
        throw new BadRequestError('Please Upload Image Smaller than 1KB')
    }
    const imagePath = path.join(__dirname,'../public/uploads/'+`${productImage.name}`)
    await productImage.mv(imagePath);
    return res
        .status(StatusCodes.OK)
        .json({ image: {src: `/uploads/${productImage.name}` } });
}

const uploadProductImage = async(req,res)=>{
    if(!req.files){
        throw new BadRequestError('No File Uploaded')
    }
    const productImage = req.files.image;
    if(!productImage.mimetype.startsWith('image')){
        throw new BadRequestError('Please Upload Image')
    }
    const maxSize = 1024 * 1024;
    if(productImage.size > maxSize){
        throw new BadRequestError('Please Upload Image Smaller than 1KB')
    }
    const result = await cloudinary.uploader.upload(productImage.tempFilePath,{
        use_filename:true, folder:'Uploads'
    })
    fs.unlinkSync(productImage.tempFilePath)
    return res.status(StatusCodes.OK).json({ image: {src: result.secure_url } });
}

module.exports = {
    uploadProductImage,
}