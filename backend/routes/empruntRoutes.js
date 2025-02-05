const express = require('express');
const router = express.Router();
const empruntController = require('../controllers/empruntController');

router.get('/emprunts', empruntController.getAll);
router.post('/emprunts', empruntController.create);
// router.put('/emprunts/:idUs', empruntController.updateDuration);
router.delete('/emprunts/:idUs', empruntController.delete);
router.get('/monthly', empruntController.getMonthlyStats);
router.get('/statistics/etatMat', empruntController.getStatsByEtatMat); 
router.patch('/emprunts/:idUs', empruntController.updateDuration);

module.exports = router;
