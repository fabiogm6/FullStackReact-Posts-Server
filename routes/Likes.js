const express = require("express");
const router = express.Router();
const { Likes } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post("/", validateToken, async (req, res) => {
    const { PostId } = req.body;
    const UserId = req.user.id;

    const found = await Likes.findOne({
        where: { PostId: PostId, UserId: UserId },
    });
    //adiciona ou remove likes, para não ter duplicidade de likes
    if (!found) {
        await Likes.create({ PostId: PostId, UserId: UserId });
        res.json({ liked: true });
    } else { //unlike o post
        await Likes.destroy({
            where: { PostId: PostId, UserId: UserId },
        });
        res.json({ liked: false });
    }
});

module.exports = router;
