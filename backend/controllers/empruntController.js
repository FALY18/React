const Emprunt = require('../models/empruntModel');

const empruntController = {
    getAll: (req, res) => {
        Emprunt.getAll((err, results) => {
            if (err) {
                console.error('Erreur lors de la récupération des emprunts:', err);
                return res.status(500).json({ error: 'Une erreur s\'est produite' });
            }
            return res.json(results);
        });
    },
    create: (req, res) => {
        // const { idUs, id, foncUs, salle, duree } = req.body;
        // const values = [idUs, id, foncUs, salle, duree];
        const values = [req.body.idUs, req.body.id, req.body.dateEmprunt, req.body.salle, req.body.duree];

        Emprunt.create(values, (err, results) => {
            if (err) {
                console.error('Erreur lors de la création de l\'emprunt:', err);
                return res.status(500).json({ error: 'Une erreur s\'est produite' });
            }
            return res.status(200).json(results);
        });
    },
    updateDuration: (req, res) => {
        const { idUs } = req.params;
        const { newDuration } = req.body;
        Emprunt.updateDuration(idUs, newDuration, (err, results) => {
            if (err) {
                console.error('Erreur lors de la mise à jour de la durée:', err);
                return res.status(500).json({ error: 'Une erreur s\'est produite' });
            }
            return res.json(results);
        });
    },
    delete: (req, res) => {
        const { idUs } = req.params;
        Emprunt.delete(idUs, (err, results) => {
            if (err) {
                console.error('Erreur lors de la suppression de l\'emprunt:', err);
                return res.status(500).json({ error: 'Une erreur s\'est produite' });
            }
            return res.json(results);
        });
    },
    getMonthlyStats: (req, res) => {
        Emprunt.getMonthlyStats((err, results) => {
            if (err) {
                console.error('Erreur lors de la récupération des statistiques mensuelles:', err);
                return res.status(500).json({ error: 'Une erreur s\'est produite' });
            }
            return res.json(results);
        });
    },
    getStatsByEtatMat: (req, res) => {
        Emprunt.getStatsByEtatMat((err, results) => {
            if (err) {
                console.error('Erreur lors de la récupération des statistiques par état du matériel:', err);
                return res.status(500).json({ error: 'Une erreur s\'est produite' });
            }
            return res.json(results);
        });
    }
}
module.exports = empruntController