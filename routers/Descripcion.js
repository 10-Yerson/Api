'use strict';

const { Router } = require('express');

const descripcionController = require('../controllers/Descripcion');

const router = Router();

router.get('/', descripcionController.getDescriptions);
router.get('/:id', descripcionController.getDescription);
router.post('/save-descriptions', descripcionController.saveDescriptions);
router.put('/edit-cyclist/:id?', descripcionController.updateDescripcion);
router.delete('/delete/:id?', descripcionController.deleteDescripcion)


module.exports = router;
