const express = require('express');
const cors = require('cors');
const dinosaurRoutes = require('./routes/dinosaur.routes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/dinosaurs', dinosaurRoutes);

// Ruta de bienvenida
app.get('/', (req, res) => {
  res.json({
    message: '🦕 API de Dinosaurios',
    version: '1.0.0',
    endpoints: {
      dinosaurs: '/api/dinosaurs',
      documentation: 'Consulte la documentación para más detalles',
    },
  });
});

// Ruta para 404 - SOLUCIÓN: usar '/*' en lugar de '*'
app.all('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: `Ruta no encontrada: ${req.originalUrl}`,
  });
});


// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Error interno del servidor',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

module.exports = app;