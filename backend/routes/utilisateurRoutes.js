const express = require('express');
const router = express.Router();
const utilisateurController = require('../controllers/utilisateurController');

router.post('/utilisateurs', utilisateurController.create);
router.get('/utilisateurs', utilisateurController.getAll);
router.delete('/utilisateurs/:idUs', utilisateurController.delete);
router.put('/utilisateurs/:idUs', utilisateurController.update);
//router.get('/utilisateurs/:foncUs', utilisateurController.findByRole);

module.exports = router;
