const express = require('express');
const router = express.Router();
const materielController = require('../controllers/materielController');

router.get('/materiels', materielController.getAll);
router.post('/materiels', materielController.create);
router.put('/materiels/:id', materielController.update);
router.delete('/materiels/:id', materielController.delete);
module.exports = router;
