const express = require("express");
const app = express();
const cors = require("cors");
//require("dotenv").config(); //para determinar a porta no server Heroku

app.use(express.json());
app.use(cors());

const db = require("./models");

// Endpoints
const postRouter = require("./routes/Posts");
app.use("/posts", postRouter);

const commentsRouter = require("./routes/Comments");
app.use("/comments", commentsRouter);

const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);

const likesRouter = require("./routes/Likes");
app.use("/likes", likesRouter);

/*db.sequelize.sync()
  .then(() => {
    app.listen(3001, () => {
      console.log("Hello FGM World - Server running on port 3001 - server/index.js ");
    });
  });

*/

db.sequelize
  .sync()
  .then(() => {
    app.listen(process.env.PORT || 3001, () => {
      //porta definida pelo Heroku process.env.PORT ou local server: 3001
      //no deploy pelo professor ele incluiu: require("dotenv").config(); //para determinar a porta no server Heroku
      //   no inicio deste código, mas retorna erro
      console.log("Hello FGM World - Server running on port 3001 - server/index.js ");
    });
  })
  .catch((err) => {
    console.log(err);
  });


