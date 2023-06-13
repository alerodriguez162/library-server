//IMPORTACIONES
const Activity = require("./../models/Activity");
const User = require("./../models/User");

//CREAR ACTIVIDAD
exports.createActivity = async (req, res) => {
  //Obtener los datos del formulario
  const { title, description, type, level, topic, structure, url } = req.body;

  try {
    const newActivity = await Activity.create({
      title,
      description,
      type,
      level,
      topic,
      structure,
      url,
    });
    //Devolver la respuesta en formato json
    res.status(200).json({
      message: "Success",
      activity: newActivity,
      level: level,
    });
  } catch (error) {
    //error en server
    res.status(500).json({
      message: "Hubo un error creando la actividad",
      error: error,
    });
  }
};

//READ ACTIVITIES
exports.readAllActivities = async (req, res) => {
  try {
    const { search } = req.body;

    let activities;
    if (!search) {
      activities = await Activity.find({});
    } else {
      let regex = new RegExp(search, "i");

      activities = await Activity.find({
        $and: [
          {
            $or: [
              { title: regex },
              { description: regex },
              { type: regex },
              { level: regex },
              { topic: regex },
              { structure: regex },
            ],
          },
        ],
      });
    }

    res.json({
      message: "Actividades obtenidas con éxito",
      activities,
    });
  } catch (error) {
    res.status(500).json({
      message: "Hubo un error obteniendo las actividades",
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
      message: "Actividad obtenida con éxito",
      data: activity,
    });
  } catch (error) {
    res.status(500).json({
      message: "Hubo un error obteniendo los datos.",
      error: error,
    });
  }
};

//EDIT ACTIVITY
exports.editActivity = async (req, res) => {
  //obtiene el dato de la url
  const { id } = req.params;

  //obtiene datos del body
  const { title, description, type, level, topic, structure, url } = req.body;
  try {
    const updateActivity = await Activity.findByIdAndUpdate(
      id,
      {
        title,
        description,
        type,
        level,
        topic,
        structure,
        url,
      },
      { new: true }
    );
    res.json({
      message: "Actividad actualizada con éxito",
      data: updateActivity,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Hubo un error actualizando los datos.",
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
      message: "Actividad borrada con éxito",
      data: deleteActivity,
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "Hubo un error borrando la actividad.",
      error: error,
    });
  }
};

exports.uploadActivity = async (req, res) => {};
