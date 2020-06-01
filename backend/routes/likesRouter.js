const express = require("express");

const { addLike, removeLike } = require("../controllers/likesController");
const { protect } = require("../middleware/auth");
const router = express.Router({ mergeParams: true });

router.use(protect);

router.route("/").post(addLike);
router.route("/:id").delete(removeLike);

module.exports = router;
