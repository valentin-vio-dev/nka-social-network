const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
dotenv.config();

app.set("port", process.env.SERVER_PORT || 8080);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/api/users", require("./routes/user.routes"));
app.use("/api/groups", require("./routes/group.routes"));
app.use("/api/friendship", require("./routes/friendship.routes"));
app.use("/api/post", require("./routes/post.routes"));

module.exports = app;
