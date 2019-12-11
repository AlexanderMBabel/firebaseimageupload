const express = require('express')
const Image = require('../models/Image')
const imageRouter = express.Router()
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false)
    }
}

const upload = multer({
    storage: storage,
    limit: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})

//store in uploads folder with multer
imageRouter.route('/uploadmulter').post(upload.single('imageData'), (req, res, next) => {
    const newImage = new Image({
        imageName: req.body.imageName,
        imageData: req.file.path
    })

    newImage.save().then((result) => {
        console.log(result)
        res.status(200).json({
            success: true,
            document: result
        })
    }).catch(err => next(err))
})

//store directly in mongodatabase with base64
imageRouter.route('/uploadbase').post((req, res, next) => {
    const newImage = new Image({
        imageName: req.body.imageName,
        imageData: req.body.imageData
    })

    newImage.save().then(result => {
        res.status(200).json({
            success: true,
            document: result
        });
    }).catch(err => next(err))

})

module.exports = imageRouter