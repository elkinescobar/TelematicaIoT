const express = require("express");
const router = express.Router();


const {

    guardarSensor,
    registrarSensor,
    listarSensores,
    editarSensor,
    actualizarSensor

}= require("../controllers/principal.controllers");

// Helpers
const { isAuthenticated } = require("../helpers/auth");

router.post("/guardarsensor", isAuthenticated, guardarSensor);
router.get("/registrarsensor", registrarSensor);
router.get("/mostrarsensores", listarSensores);
router.get("/editarsensor/:id", isAuthenticated, editarSensor);
router.post("/actualizarsensor", isAuthenticated, actualizarSensor);
module.exports = router;