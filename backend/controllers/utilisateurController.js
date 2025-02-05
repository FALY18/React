const { getAll } = require('../models/materielModel');
const Utilisateur = require('../models/utilisateurModel');
const Materiel = require('../models/materielModel');

const utilisateurController = {
    create: (req, res) => {
        const values = [
            req.body.idUs,
            req.body.nomUs,
            req.body.prenomUs,
            req.body.foncUs,
            req.body.emailUs
        ];
        Utilisateur.create(values, (err, data) => {
            if (err) return res.json("Error");
            return res.json("Utilisateur ajouté avec succès");
        });
    },

    getAll: (req, res) => {
        Utilisateur.getAll((err, data) => {
            if(err) return res.json("Error")
            return res.json(data)
        });
    },

    delete: (req,res) => {
        Utilisateur.delete(req.params.idUs, (err, data) => {
            if(err) return res.json("error")
            return res.json("success")
        })
    },

    update: (req, res) => {
        const values = [
            req.body.nomUs,
            req.body.prenomUs,
            req.body.foncUs,
            req.body.emailUs
        ];
        Utilisateur.update(req.params.idUs, values, (err, data) =>{
            if(err) return res.status(500).json({ message: 'Erreur de mise jour', error: err });
            return res.json({ message: "Msjour réussie" });
        });
    },

   /* findByRole: (req, res) => {
        Utilisateur.findByRole(req.params.foncUs, (err, data) => {
            if (err) return res.json("Error");
            return res.json(data);
        });
    }*/

    // count: (req, res) => {
    //     Materiel.count((err, data) => {
    //         if (err) return res.status(500).json("Erreur lors de la récupération des matériels");
    //         if (Array.isArray(data) && data.length > 0) {
    //             console.log("--+++++++++++++", res.data);
    //            // return res.json(data[0]);
    //         } else {
    //             return res.status(404).json("Aucun matériel trouvé");
    //         }
    //     });
    // }
    
};

module.exports = utilisateurController;
