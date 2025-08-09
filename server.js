const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


const postRoutes = require('./routes/postRoutes');
const authRoutes = require('./routes/authRoutes');


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: ['blog-rosa-pink-gamma.vercel.app'], 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

app.use('/api/posts',  postRoutes);
app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('MongoDB conectado');
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en puerto ${PORT}`);
    });
}).catch(err => console.error(err));

const publicaciones = [
{
    id: 1,
    titulo: "Mi primer artículo",
    contenido: "Lorem...",
    categoria: "Educacion",
    imagen: "https://ejemplo.com/imagen.jpg"
  },
  {
    id: 2,
    titulo: "Proyecto A",
    contenido: "Detalles...",
    categoria: "Personal",
    imagen: "https://ejemplo.com/imagen.jpg"
  }
];

app.get('/admin', (req, res) => {
  const sinProyectos = publicaciones.filter(p => p.categoria !== 'Personal');
  res.json(sinProyectos);
});

// ✅ Ruta especial si solo quieres los proyectos
app.get('/proyectos', (req, res) => {
  const soloProyectos = publicaciones.filter(p => p.categoria === 'Personal');
  res.json(soloProyectos);
});

const posts = [
  { id: 1, titulo: "Mi primer artículo", contenido: "Lorem ipsum", categoria: "Tecnologia" },
  { id: 2, titulo: "Proyecto A", contenido: "Detalles técnicos", categoria: "Personal" },
  { id: 3, titulo: "Tecnología y futuro", contenido: "IA y más", categoria: "Educacion" }
];

// 🔍 Ruta para buscar publicaciones por palabra clave

app.get('/api/posts/buscar', (req, res) => {
  const termino = req.query.q?.toLowerCase() || '';
  const resultados = posts.filter(post =>
    post.titulo.toLowerCase().includes(termino) ||
    post.contenido.toLowerCase().includes(termino)
  );
  res.json(resultados);
});