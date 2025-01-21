const express = require('express');
const router = express.Router();
const { Posts } = require("../models");

//Routers
//const postRouter = require('./routes/Posts');
//app.use("/posts", postRouter);

//testar com insomnia ou postman
router.get("/", async (req, res) => {
    //because we are using sequelize o post eh simplificado
    //sempre usar async com sequelize
    //res.send enviará para o browser quando http://localhost:3001/posts
    //res.send("Hello FGM World from server/routes/Post.js");
    //res.json("Hello World from server/routes/Post.js");

    const listOfPosts = await Posts.findAll();
    res.json(listOfPosts);
});

router.post("/", async (req, res) => {
    //because we are using sequelize o post eh simplificado
    //sempre usar async com sequelize
    const post = req.body;
    await Posts.create(post);
    res.json(post);
});

module.exports = router;

