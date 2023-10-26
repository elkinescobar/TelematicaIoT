const express = require("express");
const router = express.Router();

// Controllers
const { renderIndex, renderAbout, renderregistrar, renderlistado, renderEditarSensor } = require("../controllers/index.controller");

router.get("/", renderIndex);
router.get("/about", renderAbout);
router.get("/registrar", renderregistrar);
router.get("/listado", renderlistado);
router.get("/editarSensor", renderEditarSensor);

module.exports = router;
