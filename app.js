const express = require("express");
const app = express();
const connect = require("./models/index");
connect();
const router = require("./routes/router");
const render = require("./renders");
const cors = require("cors");
const port = 3000;
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output");
const passport = require("passport");
const passportConfig = require("./passport/index");
const fs = require("fs");
const http = require("http");
const https = require("https");
require("dotenv").config();
passportConfig();

app.use(
    cors({
        origin: true,
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", router);
app.use("/", render);
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use("/public", express.static("public"));
app.use(express.static("public"));
app.use(passport.initialize());

app.use((req, res, next) => {
    res.sendStatus(404);
});
app.use((error, req, res, next) => {
    console.error(error);
    res.sendStatus(500);
});

//  const options = {
//   ca: fs.readFileSync(process.env.HTTPS_CA),
//   key: fs.readFileSync(process.env.HTTPS_KEY),
//   cert: fs.readFileSync(process.env.HTTPS_CERT)
//   };
app.listen(3000, () => {
    console.log("listening at port 3000");
});
//   https.createServer(options, app).listen(443);
