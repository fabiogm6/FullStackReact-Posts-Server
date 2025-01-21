const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcryptjs"); //npm install bcryptjs no server
const { validateToken } = require("../middlewares/AuthMiddleware");
const { sign } = require("jsonwebtoken");


router.post("/", async (req, res) => {
    const { username, password } = req.body;
    bcrypt.hash(password, 10).then((hash) => {
        Users.create({
            username: username,
            password: hash,
        });
        res.json("server/routes/users/bcrypt hash SUCCESS");
    });
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = await Users.findOne({ where: { username: username } }); // findOne sequelize

    if (!user) {
        res.json({ error: "server/routes/users/User/login Doesn't Exist" });
    } else {
        bcrypt.compare(password, user.password).then((match) => {
            if (!match) {
                res.json({ error: "123 server/routes/users/loginWrong Username And Password Combination" });
            } else {
                const accessToken = sign(
                    { username: user.username, id: user.id },
                    "importantsecret"
                );
                res.json({ token: accessToken, username: username, id: user.id });
                //envia ao front-end
                //res.json("server/routes/users/login User LOGGED IN!!!");
            };
        });
    };

});

router.get("/auth", validateToken, (req, res) => {
    res.json(req.user);
});

router.get("/basicinfo/:id", async (req, res) => {
    const id = req.params.id;

    const basicInfo = await Users.findByPk(id, { // findByPk sequelize
        attributes: { exclude: ["password"] }, //exclude no retorno o campo 'password'
    });

    res.json(basicInfo);
});

router.put("/changepassword", validateToken, async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const user = await Users.findOne({ where: { username: req.user.username } });

    bcrypt.compare(oldPassword, user.password).then(async (match) => {
        if (!match) res.json({ error: "Wrong Password Entered!" });

        bcrypt.hash(newPassword, 10).then((hash) => {
            Users.update(
                { password: hash },
                { where: { username: req.user.username } }
            );
            res.json("SUCCESS");
        });
    });
});

module.exports = router;