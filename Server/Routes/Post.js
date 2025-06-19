const getAllPosts = require('../Controller/Post/getAllPost')
const fetchFile = require('../Controller/Post/getPost')
const getUserPost = require('../Controller/Post/getUserPost')
const {createPost} = require('../Controller/Post/UploadPost')
const upload = require('../Middleware/Upload')
const authMiddleware = require('../Auth/VerifyUser')

const router = require('express').Router()

router.post('/createPost',authMiddleware,upload.array("files", 10),createPost)
router.get('/file/:filename', authMiddleware,fetchFile.getFile);
router.get('/getmypost',authMiddleware,getUserPost);
router.get('/getpost',authMiddleware,getAllPosts)

module.exports = router