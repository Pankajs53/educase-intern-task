const express = require("express");
const router = express.Router();

const {addSchool,getAllSchools} = require("../controller/schoolController")

router.post("/addSchool",addSchool);

router.get("/listSchools",getAllSchools)


module.exports = router;