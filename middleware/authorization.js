//ES UN MIDDLEARE DE RUTA
//DESENCRIPTAR EL JWT
const jwt = require("jsonwebtoken");
const decrypt = async (req, res, next) => {
  //CAPTURAR EL TOKEN Y GUARDARLO EN UNA VARIABLE
  //obtener el token que viene anclado del cliente

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Please provide a token",
    });
  }

  //SI, SI HAY TOKEN Y TODO BIEN....
  try {
    //ABRIRL EL TOKEN
    //Pasarle nuestra llave
    const token = authHeader.split(" ")[1];
    const openToken = await jwt.verify(token, process.env.SECRET);

    req.user = openToken.user;
    next();
  } catch (error) {
    res.json({
      message: "Hubo un error con el token",
    });
  }
};

module.exports = decrypt;
