const express = require('express');
const router = express.Router();
const { News } = require('../models');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

const storage = multer.memoryStorage();
const upload = multer({ storage });

cloudinary.config({
    cloud_name: 'rameljay',
    api_key: '236128657763151',
    api_secret: '72tdl4MfLFyDHd0t-H1ogWiCi58'
});

router.post('/', upload.single('image'), (req, res) => {

    const caption = req.body;
    const image  = req.file.path;

    cloudinary.uploader.upload(image, (error, result) => {
        if(error){
            console.log(error);
        }else{
            const imageUrl = result.secure_url;

            News.create({
                caption: caption,
                image: imageUrl
            });
        }
    });
});


module.exports = router;

