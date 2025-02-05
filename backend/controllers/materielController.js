const Materiel = require('../models/materielModel');

const materielController = {
    getAll: (req, res) => {
        Materiel.getAll((err, data) => {
            if (err) return res.json("Error...");
            return res.json(data);
        });
    },

    create: (req, res) => {
        const values = [
            req.body.id,
            req.body.nomMat,
            req.body.qteMat,
            req.body.etatMat
        ];
        Materiel.create(values, (err, data) => {
            if (err) return res.json("Error...");
            return res.json("Matériel ajouté avec succès");
        });
    },

    update: (req, res) => {
        const values = [
            req.body.nomMat,
            req.body.qteMat,
            req.body.etatMat
        ];
        Materiel.update(req.params.id, values, (err, data) => {
            if (err) return res.json("Error...");
            return res.json("Mise à jour réussie");
        });
    },

    delete: (req, res) => {
        Materiel.delete(req.params.id, (err, data) => {
            if (err) return res.json("Error...");
            return res.json("Matériel supprimé avec succès");
        });
    },

};

module.exports = materielController;
