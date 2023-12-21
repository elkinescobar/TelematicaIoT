const express = require("express");
const router = express.Router();

const {
    postValorIoT,
    mostrardatos

}= require("../controllers/principal.controllers");

// Helpers
const { isAuthenticated } = require("../helpers/auth");
router.post("/telematica/postIoT", postValorIoT);
router.get("/", mostrardatos);
module.exports = router;