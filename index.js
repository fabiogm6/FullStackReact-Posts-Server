const express = require("express");
const app = express();
const cors = require("cors");
//require("dotenv").config(); //para determinar a porta no server Heroku

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3001 || 16312 || 10000 || 8888;

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

/*
db.sequelize.sync()
  .then(() => {
    app.listen(3001, () => {
      console.log("Hello FGM World - Server running on port 3001 - server/index.js ");
    });
  });
*/

/* Backend servers Ports:
3001 for Local
10000 for Render
8888 for Netlify
16312 for Vercel
*/

db.sequelize
  .sync()
  .then(() => {
    app.listen(process.env.PORT || 3001 || 16312 || 10000 || 8888, () => {
      //porta definida pelo Heroku process.env.PORT ou local server: 3001
      //no deploy pelo professor ele incluiu: require("dotenv").config(); //para determinar a porta no server Heroku
      //   no inicio deste código, mas retorna erro
      console.log("Hello FGM World - Server running on port - server/index.js ");
    });
  })
  .catch((err) => {
    console.log(err);
  });

/* Gemini - tentando resolver o timeout
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('crud-pedro-tutorialdb', 'avnadmin', 'AVNS_iw4PJs8dWZ736fu-Paz', {
  host: 'mysql-37c02d36-fullstackreact-posts.h.aivencloud.com', // Or your MySQL server's address
  port: 16312, // Default MySQL port
  dialect: 'mysql',
  logging: console.log, // (Optional) Enable logging of SQL queries to the console
  pool: { // (Optional) Configure connection pooling
    max: 5,
    min: 0,
    acquire: 60000,
    idle: 20000
  }
});
*/