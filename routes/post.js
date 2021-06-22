const express = require("express");
const {
  getPosts,
  createPost,
  postsByUser,
  postById,
  isPoster,
  updatePost,
  deletePost,
  postPhoto,
  singlePost,
  like,
  unlike,
} = require("../controllers/post");
const { requireSignin } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const validator = require("../validator");
const multer = require("multer");
const path = require("path");

const router = express.Router();

const storage = multer.diskStorage({
  destination: "./uploads/images/posts",
  filename: (req, file, next) => {
    let fileExtension = path.extname(file.originalname);
    let fileName = `${file.fieldname}_${Date.now()}${fileExtension}`;
    req.fileName = fileName;
    req.filePath = `./uploads/images/posts/${fileName}`;
    req.fileContentType = file.mimetype;
    return next(null, fileName);
  },
});

const upload = multer({
  storage: storage,
});

router.get("/posts", getPosts);
router.post(
  "/post/new/:userId",
  requireSignin,
  upload.single("photo"),
  createPost
);
router.get("/posts/by/:userId", requireSignin, postsByUser);
router.get("/post/:postId", singlePost);
router.put(
  "/post/:postId",
  requireSignin,
  isPoster,
  upload.single("photo"),
  updatePost
);
router.delete("/post/:postId", requireSignin, isPoster, deletePost);
//photo
router.get("/post/photo/:postId", postPhoto);

//like/unline
router.post("/post/like", requireSignin, like);
router.post("/post/unlike/:postId", requireSignin, unlike);

router.param("userId", userById);
router.param("postId", postById);

module.exports = router;
