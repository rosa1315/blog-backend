
const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const verificarToken = require('../middleware/auth');



router.post('/', verificarToken, postController.crearPost);
router.get('/', postController.obtenerPosts);
router.get('/:id', postController.obtenerPost);
router.put('/:id', verificarToken, postController.actualizarPost);
router.delete('/:id', verificarToken, postController.eliminarPost);
router.get('/buscar', postController.obtenerPosts);




module.exports = router;
