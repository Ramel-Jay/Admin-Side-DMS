const express = require('express');
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Origin', "http://localhost:3000");
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.use(express.json());
app.use(cors({origin: "http://localhost:3000"}));
app.use(cookieParser());

const db = require('./models');

//Routers
const postRouter = require('./routes/Posts')
app.use("/cash", postRouter);

//InKind Router
const inKindRouter = require('./routes/InKindPost')
app.use("/inkind", inKindRouter);

//Admin Router
const adminRouter = require('./routes/Admin')
app.use("/auth", adminRouter);

//News Router
const newsRouter = require('./routes/News')
app.use("/news", newsRouter);

//Home Router
const homeRouter = require("./routes/Home")
app.use("/home", homeRouter);

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("listening on port 3001");
    });
});