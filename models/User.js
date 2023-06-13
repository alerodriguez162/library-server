// 1. IMPORTACIONES
const { Schema, model } = require("mongoose");
// 2. SCHEMAS
const userSchema = Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    lastName: {
      type: String,
      default: "",
    },
    level: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      required: true,
      unique: true, //unico email, no permite registrar 2 veces el mimso correo
      lowercase: true, //solo minusculas
      trim: true, //no permite espacios
    },
    password: {
      type: String,
      required: true,
    },
    // image: {
    //   type: String,
    //   default: "",
    // },
    role: {
      type: String,
      default: "student",
    },
  },
  {
    timestamps: true, //date en la q fue creado
  }
);

// 3. MODELOS
const User = model("User", userSchema);

// 4. EXPORTACIÓN
module.exports = User;
