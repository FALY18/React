// const express = require('express');
// const router = express.Router();
// const empruntController = require('../controllers/empruntController');
// const utilisateurController = require('../controllers/utilisateurController');
// const materielController = require('../controllers/materielController');

// router.get('/data', async (req, res) => {
//     try {
//         const emprunts = await empruntController.count(req, res);
//         const utilisateurs = await utilisateurController.count(req, res);
//         const materiels = await materielController.count(req, res);

//         res.json({
//             emprunts: emprunts.count,
//             utilisateurs: utilisateurs.count,
//             materiels: materiels.count
//         });
//     } catch (error) {
//         console.error('Erreur lors de la récupération des données du tableau de bord:', error);
//         res.status(500).send('Erreur serveur');
//     }
// });

// module.exports = router;
