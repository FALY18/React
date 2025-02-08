const db = require('./db');

class Emprunt {
    static create(values, callback) {
        const sql = "INSERT INTO emprunts(idUs, id, dateEmprunt, salle, duree) VALUES (?, ?, ?, ?, ?)";
        db.query(sql, values, (err, results) => {
            if (err) {
                console.error('Erreur lors de la création de l\'emprunt:', err);
                return callback(err, null);
            }
            return callback(null, results);
        });
    }

    static getAll(callback) {
        const sql = "SELECT e.*,u.nomUs,u.prenomUs,u.foncUs FROM utilisateurs u JOIN emprunts e ON u.idUs = e.idUs ";
        db.query(sql, (err, results) => {
            if (err) {
                console.error('Erreur lors de la récupération des emprunts:', err);
                return callback(err, null);
            }
            return callback(null, results);
        });
    }

    static updateDuration(idUs, newDuration, callback) {
        const sql = "UPDATE emprunts SET duree = ? WHERE idUs = ?";
        db.query(sql, [newDuration, idUs], (err, results) => {
            if (err) {
                console.error('Erreur lors de la mise à jour de la durée:', err);
                return callback(err, null);
            }
            return callback(null, results);
        });
    }

    static delete(idUs, callback) {
        const sql = "DELETE FROM emprunts WHERE idUs = ?";
        db.query(sql, [idUs], (err, results) => {
            if (err) {
                console.error('Erreur lors de la suppression de l\'emprunt:', err);
                return callback(err, null);
            }
            return callback(null, results);
        });
    }

    
/************** ****************************/
static getStatsByEtatMat(callback) {
    const sql = `
    SELECT etatMat, COUNT(id) AS totalQuantity
    FROM materiels
    GROUP BY etatMat
    ORDER BY etatMat`;
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des statistiques par état du matériel:', err);
            return callback(err, null);
        }
        return callback(null, results);
    });

}

}
module.exports = Emprunt;
