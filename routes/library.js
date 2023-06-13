//1.IMPORTACIONES
const express = require("express");

const router = express.Router();
const {
  createActivity,
  readAllActivities,
  readOneActivity,
  editActivity,
  deleteActivity,
} = require("../controllers/activityController");

//2.RUTEO

//CREAR ACTIVIDAD
router.post("/create", createActivity);

//lEER ACTIVIDADES
router.post("/readall", readAllActivities);

//LEER UNA ACTIVIDAD
router.get("/readone/:id", readOneActivity);

//ACTUALIZAR UNA ACTIVIDAD
router.put("/edit/:id", editActivity);

//BORRAR UNA ACTIVIDAD
router.delete("/delete/:id", deleteActivity);

//3.EXPORTACION
module.exports = router;
