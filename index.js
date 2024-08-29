const express = require("express");
const { createdb } = require("./config/createDatabase")
const dotenv = require("dotenv"); 
const schoolRoutes  = require("./routes/schoolRoutes")
dotenv.config();

const app = express();

createdb();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/v1",schoolRoutes);
app.get("/", (req, res) => {
    res.send(`<h1>Hiii Server is running.......</h1>`)
})


app.listen(PORT, () => {
    console.log(`LISTING ON ${PORT}....`)
})