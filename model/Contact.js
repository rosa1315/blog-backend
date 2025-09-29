const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  correo: {
    type: String,
    required: true,
    match: /.+\@.+\..+/ // validación simple de correo
  },
  mensaje: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model("Contact", contactSchema);