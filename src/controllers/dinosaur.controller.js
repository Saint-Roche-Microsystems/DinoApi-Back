const Dinosaur = require('../models/Dinosaur');

// Crear un nuevo dinosaurio
exports.createDinosaur = async (req, res) => {
  try {
    const dinosaur = new Dinosaur(req.body);
    await dinosaur.save();
    res.status(201).json({
      success: true,
      data: dinosaur,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Obtener todos los dinosaurios con paginación
exports.getAllDinosaurs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 20;
    const skip = (page - 1) * limit;

    // Construir filtro de búsqueda
    const filter = {};
    
    if (req.query.diet) {
      filter.diet = req.query.diet;
    }
    
    if (req.query.locomotionType) {
      filter.locomotionType = req.query.locomotionType;
    }
    
    if (req.query.search) {
      filter.$text = { $search: req.query.search };
    }

    const dinosaurs = await Dinosaur.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Dinosaur.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      success: true,
      count: dinosaurs.length,
      total,
      totalPages,
      currentPage: page,
      data: dinosaurs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Obtener un dinosaurio por ID
exports.getDinosaurById = async (req, res) => {
  try {
    const dinosaur = await Dinosaur.findById(req.params.id);
    
    if (!dinosaur) {
      return res.status(404).json({
        success: false,
        error: 'Dinosaurio no encontrado',
      });
    }

    res.status(200).json({
      success: true,
      data: dinosaur,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Actualizar un dinosaurio
exports.updateDinosaur = async (req, res) => {
  try {
    const dinosaur = await Dinosaur.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!dinosaur) {
      return res.status(404).json({
        success: false,
        error: 'Dinosaurio no encontrado',
      });
    }

    res.status(200).json({
      success: true,
      data: dinosaur,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Eliminar un dinosaurio
exports.deleteDinosaur = async (req, res) => {
  try {
    const dinosaur = await Dinosaur.findByIdAndDelete(req.params.id);

    if (!dinosaur) {
      return res.status(404).json({
        success: false,
        error: 'Dinosaurio no encontrado',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Dinosaurio eliminado exitosamente',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Estadísticas de dinosaurios
exports.getDinosaurStats = async (req, res) => {
  try {
    const stats = await Dinosaur.aggregate([
      {
        $group: {
          _id: '$diet',
          count: { $sum: 1 },
          dinosaurs: { $push: '$name' }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    const total = await Dinosaur.countDocuments();
    const locomotionStats = await Dinosaur.aggregate([
      {
        $group: {
          _id: '$locomotionType',
          count: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalDinosaurs: total,
        dietDistribution: stats,
        locomotionDistribution: locomotionStats,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};