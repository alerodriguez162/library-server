//ES UN MIDDLEARE DE RUTA
//DESENCRIPTAR EL JWT
const jwt = require("jsonwebtoken");
const decrypt = async (req, res, next) => {
  //CAPTURAR EL TOKEN Y GUARDARLO EN UNA VARIABLE
  //obtener el token que viene anclado del cliente

  const token = req.header("x-auth-token");

  //SI NO HAY TOKEN:
  if (!token) {
    return res.status(400).json({
      msg: "No hay token, permiso no valido",
    });
  }

  //SI, SI HAY TOKEN Y TODO BIEN....
  try {
    //ABRIRL EL TOKEN
    //Pasarle nuestra llave
    const openToken = await jwt.verify(token, process.env.SECRET);

    req.user = openToken.user;
    next();
  } catch (error) {
    res.json({
      msg: "Hubo un error con el token",
    });
  }
};

module.exports = decrypt;
