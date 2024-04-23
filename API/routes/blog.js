const router = require("express").Router();
const { verifyAccessToken } = require("../middlewares/verifyToken");
const ctrls = require("../controllers/blog");
router.post("/", [verifyAccessToken, isAdmin], ctrls.createNewBlog);
router.put("/", [verifyAccessToken, isAdmin], ctrls.updateBlog);

module.exports = router;
