const mongoose = require('mongoose');

const dinosaurSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre es requerido'],
    unique: true,
    trim: true,
  },
  temporalRange: {
    type: String,
    required: [true, 'El rango temporal es requerido'],
    trim: true,
  },
  diet: {
    type: String,
    required: [true, 'La dieta es requerida'],
    enum: ['herbivore', 'carnivore', 'omnivore'],
  },
  locomotionType: {
    type: String,
    required: [true, 'El tipo de locomoción es requerido'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'La descripción es requerida'],
  },
  titleImg: {
    type: String,
    trim: true,
  },
  imageURL: {
    type: String,
    trim: true,
    match: [/^https?:\/\/.+/, 'Por favor ingresa una URL válida'],
  },
  licenseImg: {
    type: String,
    trim: true,
  }
}, {
  timestamps: true,
  collection: 'DinoData',
});

// Índice para búsquedas
dinosaurSchema.index({ name: 'text', description: 'text' });

const Dinosaur = mongoose.model('Dinosaur', dinosaurSchema);

module.exports = Dinosaur;