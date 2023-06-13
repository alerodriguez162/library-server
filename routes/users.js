// 1. IMPORTACIONES
const express = require("express");
const router = express.Router();
const authorization = require("./../middleware/authorization");
const {
  postSignup,
  postLogin,
  getVerifyToken,
  readAllUsers,
  readOneUser,
  editUser,
  updateUser,
} = require("./../controllers/userController");

// 2. ROUTER
//CREAR USUARIO
router.post("/signup", postSignup);

//INICIAR SESION DE USUARIO
router.post("/login", postLogin);

//VERIFICACON DE USUARIO
router.get("/verifytoken", authorization, getVerifyToken);

//lEER USUARIOS
router.post("/readall", authorization, readAllUsers);

//LEER UN USUARIO
router.get("/readone", authorization, readOneUser);

//EDITAR DATOS DE USUARIO
router.put("/editprofile/:id", authorization, editUser);

router.put("/updaterole/:id", authorization, updateUser);

// 3. EXPORTACIÓN
module.exports = router;
