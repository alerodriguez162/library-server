//1. IMPORTACIONES
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//2. SCHEMA
const activitySchema = Schema({
  type: {
    type: String,
    require: true,
  },
  level: {
    type: String,
    require: true,
  },
  topic: String,

  structure: {
    type: String,
    require: true,
  },
  exercises: {
    type: String,
    require: true,
  },
  url: {
    type: String,
    require: true,
  },
});

//3.MODELO
//mongoose.model([Colection], [referencia del Schema])
const Activity = mongoose.model("Activity", activitySchema);

//4. EXPORTACION
module.exports = Activity;
