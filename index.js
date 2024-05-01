const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const dbFunction = require("./config/db");
const userRoute = require("./route/user.route");
const noteRoute = require("./route/notes.route");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
app.use(`/users`,  userRoute );
app.use(`/notes` , noteRoute);

app.listen(`${process.env.PORT}` || 5000, async() => {
    try {
        console.log("server is running");
        await dbFunction();
    } catch (error) {
        console.log(error);
    }
})