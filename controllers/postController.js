const Post = require('../model/Post');

// Crear nuevo post
exports.crearPost = async (req, res) => {
   
    try {
        const nuevoPost = new Post(req.body);
        const guardado = await nuevoPost.save();
        res.status(201).json(guardado);
    } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ mensaje: 'Categoría inválida. Solo se permite: Tecnologia, Educacion o Personal' });
    }
        res.status(500).json({ mensaje: 'Error al crear el post' });
    }
};

// Obtener todos los posts
exports.obtenerPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ fecha: -1 });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener los posts' });
    }
};

// Obtener un solo post
exports.obtenerPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ mensaje: 'Post no encontrado' });
        res.json(post);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener el post' });
    }
};

// Actualizar post
exports.actualizarPost = async (req, res) => {
    try {
        const actualizado = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(actualizado);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar el post' });
    }
};

// Eliminar post
exports.eliminarPost = async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.json({ mensaje: 'Post eliminado' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el post' });
    }
};
//busar 
exports.buscarPosts = async(req, res) => {
    try {
        const { q } = req.query;
        if(!q) {
            return res.status(400).json({message:
            'Parametro de busqueda requerido' });
        }

    }
};