
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    contenido: { type: String, required: true},
    imagen: { type: String },
    categoria: { type: String, required: true , enum: ['Tecnologia', 'Educacion','Personal'] },
    fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', postSchema);
