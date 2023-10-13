//1.IMPORTACIONES
const express = require("express");
const app = express();
const multer = require("multer");
const csvtojson = require("csvtojson");
const connectDB = require("./config/db");
const cors = require("cors");
const Activity = require("./models/Activity");

require("dotenv").config();
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//2.MIDDLEWARES
//BAse de datos
connectDB();

//Todas las peticiones y respuestas se manejan en protocolo JSON
app.use(express.json());
app.use(express.static("public"));
//3.RUTAS
app.use("/library", require("./routes/library"));

//users
app.use("/auth", require("./routes/users"));

//4.SERVER
app.listen(process.env.PORT, () => {
  console.log(`Servidor trabajando en http://localhost:${process.env.PORT}`);
});

var excelStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
var excelUploads = multer({ storage: excelStorage });

app.post("/uploadfile", excelUploads.single("uploadfile"), (req, res) => {
  importFile(__dirname + "/" + req.file.filename);
  async function importFile(filePath) {
    //  Read Excel File to Json Data
    var arrayToInsert = [];
    csvtojson({ delimiter: ",", fork: true })
      .fromFile(filePath)
      .then(async (source) => {
        // Fetching the all data from each row
        for (var i = 0; i < source.length; i++) {
          var singleRow = {
            title: source[i]["Title"] ?? "",
            description: source[i]["Description"] ?? "",
            type: source[i]["Type"] ?? "",
            level: source[i]["Level"] ?? "",
            topic: source[i]["Topic"] ?? "",
            structure: source[i]["Structure"] ?? "",
            url: source[i]["Resource"] ?? "",
          };
          arrayToInsert.push(singleRow);
        }

        try {
          //inserting into the table student
          const data = await Activity.insertMany(arrayToInsert);
          console.log(arrayToInsert);
          console.log("File imported successfully.");
          res.status(200).json({
            message: "Success",
            activites: data,
          });
        } catch (error) {
          res.status(400);
        }
      });
  }
});
