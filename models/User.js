// 1. IMPORTACIONES
const { Schema, model } = require("mongoose");
// 2. SCHEMAS
const userSchema = Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Nombre de usuario es requerido"],
    },
    lastname: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      required: true,
      unique: true, //unico email, no permite registrar 2 veces el mimso correo
      lowercase: true, //solo minusculas
      trim: true, //no permite espacios
      match: [/^\S+@\S+\.\S+$/, "Por favor, use un email valido"], //validar que sea un correo con una expresion regular
    },
    password: {
      type: String,
      required: [true, "Password es requerido"],
    },
    image: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      required: true,
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
