const bcryptjs = require("bcryptjs");
const User = require("./../models/User");
const jwt = require("jsonwebtoken");

exports.postSignup = async (req, res) => {
  //Creacion de usuarios
  //1.OBTENER USUARIO, EMAIL Y PASSWORD DEL FORMULARIO (REQ)
  const { name, lastName, level, email, password } = req.body;

  //2.VALIDACIONES
  //a) Datos vacios
  if ((!name, !email, !password)) {
    return res.status(400).json({
      message: "Todos los campos son obligatorios",
      error: error,
    });
  }

  try {
    //3.GENERAR PASSWORD PARA BASE DE DATOS
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    //4.CREAR USUARIO EN BASE DE DATOS
    const newUser = await User.create({
      name,
      lastName,
      level,
      email,
      //nombre de la prop del modelo:password
      password: hashedPassword,
    });

    //5.AUTENTICACION CON TOKENS
    //A.CREAR UN PAYLOAD (INFORMACION DEL USUARIO)
    const payload = {
      user: {
        id: newUser._id, //ID DE MONGOBD DEL USUARIO
      },
    };

    //B. FIRMAR EL TOKEN
    jwt.sign(
      payload, // DATOS QUE ACOMPAÑARAN AL TOKEN
      process.env.SECRET, // PALABRA SECRETA (FIRMA)
      {
        expiresIn: 360000, // EXPIRACIÓN DEL TOKEN
      },
      (error, token) => {
        if (error) throw error;

        res.status(200).json({
          message: "Success",
          token: token,
        });
      }
    );
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      res.status(400).json({
        message: "Email ya registrado. Intente con otro",
      });
    } else {
      res.status(400).json({
        message: "Hubo un error con la creacion de usuario",
      });
    }
  }
};

//INICIAR SESION
//AUTENTICAR QUE EL EMAIL Y CONTRASENA QUE PASE LA PERSONA COINCIDAN Y SE LE ENVIA UN TOKEN
exports.postLogin = async (req, res) => {
  //1.Obtener el Email y el Passworddel formulario (JSON)
  const { email, password } = req.body;

  try {
    //2.Encontrar un usuario en BD
    const foundUser = await User.findOne({ email });
    //3.Validacion-Si no hubo un usuario...

    if (!foundUser) {
      return res.status(400).json({
        message: "El usuario o la contraseña son incorrectos",
      });
    }

    //4.SI TODO OK, EL USUARIO FUE ENCONTRADO, ENTONCES EVALUAMOS LA CONTRASEÑA
    const verifiedPass = await bcryptjs.compare(password, foundUser.password);
    //5.VALIDAMOS SI EL PASSWORD COINCIDE...

    if (!verifiedPass) {
      return await res.status(400).json({
        message: "El usuario o la contraseña son incorrectos",
      });
    }

    //6.SI TODO COINCIDE Y ES CORRECTO, GENERAMOS UN JSON WEB TOKEN

    //6.A ESTABLECER UN PAYLOAD (DATOS DEL USUARIO)
    const payload = {
      user: {
        id: foundUser.id,
      },
    };

    //6.B FIRMA DEL JWT
    jwt.sign(
      payload,
      process.env.SECRET,
      {
        expiresIn: 36000,
      },
      (error, token) => {
        if (error) throw error;
        res.status(200).json({
          token: token,
        });
      }
    );
    return;
  } catch (error) {
    res.status(400).json({
      message: "Hubo un problema con la autenticación",
      data: error,
    });
  }
};

//VERIFICAR USUARIO
//CUANDO ESTAMOS ACCEDIENDO A DIFERENTES RUTAS, PREGUNTAR SI EL USUARIO TIENE PERMISOS O NO
//PAR CONFIRMARLO SE LE PIDE EL TOKEN
//UNA RUTA QUE PIDE TOKENS PARA VERIFICARLO
exports.getVerifyToken = async (req, res) => {
  //DESECRIPTAR EL PROCESO DEL TOKEN
  try {
    //1.BUSCAR EL ID DEL USUARIO (DEL TOKEN ABIERTO) EN BASE DE DATOS
    //pasar el token sin contrasena

    const foundUser = await User.findById(req.user.id).select("-password");
    return res.status(200).json({
      message: "Datos de usuario encontrado",
      token: foundUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Hubo un error con el usuario",
    });
  }
};

//lEER USUARIOS
exports.readAllUsers = async (req, res) => {
  try {
    const { search } = req.body;
    let users;
    if (!search) {
      users = await User.find({});
    } else {
      let regex = new RegExp(search, "i");

      users = await User.find({
        $and: [
          {
            $or: [
              { name: regex },
              { lastName: regex },
              { email: regex },
              { role: regex },
            ],
          },
        ],
      });
    }

    res.status(200).json({
      message: "Usuarios obtenidos con éxito",
      users: users,
    });
  } catch (error) {
    res.status(400).json({
      message: "Hubo un error obteniendo los datos",
      error: error,
    });
  }
};

//LEER UN USUARIO
exports.readOneUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-hashedPassword");
    res.status(200).json({
      message: "Usuario obtenido con éxito",
      user: {
        _id: user._id,
        name: user.name,
        lastName: user.lastName,
        level: user.level,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(400).json({
      message: "Hubo un error obteniendo los datos.",
      error: error,
    });
  }
};
//EDITAR DATOS DE USUARIO
exports.editUser = async (req, res) => {
  const { id } = req.params;
  const { name, lastname, description, image } = req.body;
  try {
    const updateUser = await User.findByIdAndUpdate(
      id,
      {
        name,
        lastname,
        description,
        image,
      },
      { new: true }
    );
    res.status(200).json({
      message: "Datos actualizada con éxito",
      data: updateUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Hubo un error actualizando los datos.",
      error: error,
    });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  try {
    const updateUser = await User.findByIdAndUpdate(
      id,
      {
        role,
      },
      { new: true }
    );
    res.status(200).json({
      message: "Datos actualizada con éxito",
      data: updateUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Hubo un error actualizando los datos.",
      error: error,
    });
  }
};
