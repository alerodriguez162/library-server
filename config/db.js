const mongoose = require("mongoose");

const connectDB = async () => {
  //Conectarnos a la DB
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      family: 4,
    });

    console.log("Base de datos conectada");
  } catch (error) {
    console.log(error);
    //cierre de la base de datos
    process.exit(1);
  }
};

module.exports = connectDB;
