const express = require("express");
const {
  allUsers,
  userById,
  getUser,
  updateUser,
  deleteUser,
  userIdPhoto,
  addFollowing,
  addFollwer,
  removeFollowing,
  removeFollwer,
  findPeople,
} = require("../controllers/user");
const { requireSignin } = require("../controllers/auth");
const { createUserValidator } = require("../validator");
const multer = require("multer");
const path = require("path");
const router = express.Router();

const storage = multer.diskStorage({
  destination: "./uploads/images",
  filename: (req, file, next) => {
    let fileExtension = path.extname(file.originalname);
    let fileName = `${file.fieldname}_${Date.now()}${fileExtension}`;
    req.fileName = fileName;
    req.filePath = `./uploads/images/${fileName}`;
    req.fileContentType = file.mimetype;
    return next(null, fileName);
  },
});

const upload = multer({
  storage: storage,
});

router.post("/user/follow", requireSignin, addFollowing, addFollwer);
router.post("/user/unfollow", requireSignin, removeFollowing, removeFollwer);

router.get("/users", allUsers);
router.get("/user/:userId", requireSignin, getUser);
router.put("/user/:userId", requireSignin, upload.single("photo"), updateUser);
router.delete("/user/:userId", requireSignin, deleteUser);
//photo
router.get("/user/photo/:userId", userIdPhoto);

//who to folow
router.get("/users/findpeople/:userId", requireSignin, findPeople);

//kalau ada route yg paramnya userId, maka akan execute method userById dahulu
router.param("userId", userById);

module.exports = router;
