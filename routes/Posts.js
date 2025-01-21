const express = require('express');
//const { default: Post } = require("../../client/src/pages/Post");
const router = express.Router();
const { Posts, Likes } = require("../models");

const { validateToken } = require("../middlewares/AuthMiddleware");

//testar com insomnia ou postman
router.get("/", validateToken, async (req, res) => {
    const listOfPosts = await Posts.findAll({ include: [Likes] }); //sequelize
    const likedPosts = await Likes.findAll({ where: { UserId: req.user.id } });
    res.json({ listOfPosts: listOfPosts, likedPosts: likedPosts });
});

router.get("/byId/:id", async (req, res) => {
    const id = req.params.id;
    const post = await Posts.findByPk(id); //sequelize
    res.json(post);
});

router.get("/byuserId/:id", async (req, res) => {
    const id = req.params.id;
    const listOfPosts = await Posts.findAll({ //sequelize
        where: { UserId: id },
        include: [Likes],
    });
    res.json(listOfPosts);
});

router.post("/", validateToken, async (req, res) => {
    const post = req.body;
    post.username = req.user.username; //username é enviado aqui pelo server
    post.UserId = req.user.id;
    await Posts.create(post);
    res.json(post);
});

router.put("/title", validateToken, async (req, res) => {
    const { newTitle, id } = req.body;
    await Posts.update({ title: newTitle }, { where: { id: id } });
    res.json(newTitle);
});

router.put("/postText", validateToken, async (req, res) => {
    const { newText, id } = req.body;
    await Posts.update({ postText: newText }, { where: { id: id } });
    res.json(newText);
});

router.delete("/:postId", validateToken, async (req, res) => {
    const postId = req.params.postId;
    await Posts.destroy({ //sequelize
        where: {
            id: postId,
        },
    });

    res.json("DELETED SUCCESSFULLY");
});

module.exports = router;



