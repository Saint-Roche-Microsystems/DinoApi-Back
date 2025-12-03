const validateDinosaur = (req, res, next) => {
  const { name, diet, locomotionType } = req.body;
  const errors = [];

  if (!name || name.trim() === '') {
    errors.push('El nombre es requerido');
  }

  if (diet && !['herbivore', 'carnivore', 'omnivore'].includes(diet)) {
    errors.push('La dieta debe ser: herbivore, carnivore u omnivore');
  }

  if (!locomotionType || locomotionType.trim() === '') {
    errors.push('El tipo de locomoción es requerido');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      errors,
    });
  }

  next();
};

module.exports = { validateDinosaur };