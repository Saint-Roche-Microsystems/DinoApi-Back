const express = require('express');
const router = express.Router();
const {
  createDinosaur,
  getAllDinosaurs,
  getDinosaurById,
  updateDinosaur,
  deleteDinosaur,
  getDinosaurStats,
} = require('../controllers/dinosaur.controller');
const { validateDinosaur } = require('../middlewares/validate');

// Ruta para crear un dinosaurio
router.post('/', validateDinosaur, createDinosaur);

// Ruta para obtener todos los dinosaurios (con paginación y filtros)
router.get('/', getAllDinosaurs);

// Ruta para obtener estadísticas
router.get('/stats', getDinosaurStats);

// Ruta para obtener un dinosaurio por ID
router.get('/:id', getDinosaurById);

// Ruta para actualizar un dinosaurio
router.put('/:id', validateDinosaur, updateDinosaur);

// Ruta para eliminar un dinosaurio
router.delete('/:id', deleteDinosaur);

module.exports = router;