const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'secreto_super_seguro';

exports.registrar = async (req, res) => {
  try {
    const { nombre, email, contraseña } = req.body;
    const usuarioExistente = await User.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'El usuario ya existe' });
    }

    const hashed = await bcrypt.hash(contraseña, 10);

    const nuevoUsuario = new User({ nombre, email, contraseña: hashed });
    await nuevoUsuario.save();

    res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al registrar usuario' });
  }
};

exports.iniciarSesion = async (req, res) => {
  try {
    const { email, contraseña } = req.body;
    const usuario = await User.findOne({ email });
    if (!usuario) return res.status(400).json({ mensaje: 'Credenciales inválidas' });

    const esValido = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!esValido) return res.status(400).json({ mensaje: 'Credenciales inválidas' });

    const token = jwt.sign({ id: usuario._id }, JWT_SECRET, { expiresIn: '2h' });
    res.json({ token, usuario: { id: usuario._id, nombre: usuario.nombre } });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al iniciar sesión' });
  }
};
