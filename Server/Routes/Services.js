const authMiddleware = require('../Auth/VerifyUser');
const { addComment, getCommentsByPost } = require('../Controller/Comment');
const createFollower = require('../Controller/Follower/createFollowers');
const getFollowing = require('../Controller/Follower/getFollowing');
const { toggleLike, getLikesByPost } = require('../Controller/Like');
const dummyAccount = require('../Controller/Services/DummyAccount');
const { getNotifications, markSingleNotificationAsSeen } = require('../Controller/Services/getNotification');
const getPostById = require('../Controller/Services/getPostByid');
const { getUserProfile } = require('../Controller/Services/GetUserProfile');
const searchUser = require('../Controller/Services/SearchUser');
const updateEmail = require('../Controller/Services/UpdateEmail');
const updateName = require('../Controller/Services/UpdateName');
const updateProfilePic = require('../Controller/Services/UpdateProficPic');
const upload = require('../Middleware/Upload')
const router = require('express').Router();



router.get('/userprofile/:username',authMiddleware,getUserProfile);
router.get('/searchuser',authMiddleware,searchUser);
router.post('/createfollower',authMiddleware,createFollower)
router.get('/getmyfollowing',authMiddleware,getFollowing)
router.patch('/updateavtar',authMiddleware,upload.single('file'),updateProfilePic)
router.patch('/updatename',authMiddleware,updateName)
router.patch('/updateemail',authMiddleware,updateEmail)
router.get('/getpostbyid/:id',authMiddleware,getPostById)
router.post('/createdummyaccount',dummyAccount)
router.get('/getnotification',authMiddleware,getNotifications);
router.patch('/setseen',authMiddleware,markSingleNotificationAsSeen)


// like comment
router.post("/comment", authMiddleware, addComment);
router.get("/comments/:postId", getCommentsByPost);

router.post("/like", authMiddleware, toggleLike);
router.get("/likes/:postId", getLikesByPost);


module.exports = router

