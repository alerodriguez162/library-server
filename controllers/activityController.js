//IMPORTACIONES
const Activity = require("./../models/Activity");
const User = require("./../models/User");

//CREAR ACTIVIDAD
exports.createActivity = async (req, res) => {
  //Obtener los datos del formulario
  const { type, level, topic, structure, url } = req.body;

  try {
    const newActivity = await Activity.create({
      type,
      level,
      topic,
      structure,
      url,
    });
    //Devolver la respuesta en formato json
    res.json({
      msg: "Actividad creada con éxito",
      data: newActivity,
    });
  } catch (error) {
    //error en server
    console.log(error);
    res.status(500).json({
      msg: "Hubo un error creando la actividad",
      error: error,
    });
  }
};

//READ ACTIVITIES
exports.readAllActivities = async (req, res) => {
  try {
    const activities = await Activity.find({});
    res.json({
      msg: "Actividades obtenidas con éxito",
      data: activities,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Hubo un error obteniendo las actividades",
      error: error,
    });
  }
};

//READ ONE ACTIVITY
exports.readOneActivity = async (req, res) => {
  //obtener los parametros
  //de la url vamos a obtener datos
  const { id } = req.params;

  try {
    const activity = await Activity.findById(id);
    res.json({
      msg: "Actividad obtenida con éxito",
      data: activity,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Hubo un error obteniendo los datos.",
      error: error,
    });
  }
};

//EDIT ACTIVITY
exports.editActivity = async (req, res) => {
  //obtiene el dato de la url
  const { id } = req.params;

  //obtiene datos del body
  const { type, level, topic, structure, url } = req.body;
  try {
    const updateActivity = await Activity.findByIdAndUpdate(
      id,
      {
        type,
        level,
        topic,
        structure,
        url,
      },
      { new: true }
    );
    res.json({
      msg: "Actividad actualizada con éxito",
      data: updateActivity,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Hubo un error actualizando los datos.",
      error: error,
    });
  }
};

//DELETE ACTIVITY
exports.deleteActivity = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteActivity = await Activity.findByIdAndRemove({ _id: id });
    res.json({
      msg: "Actividad borrada con éxito",
      data: deleteActivity,
    });
  } catch (error) {
    console.log(error);
    res.json({
      msg: "Hubo un error borrando la actividad.",
      error: error,
    });
  }
};
