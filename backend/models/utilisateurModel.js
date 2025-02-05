const db = require('./db');

class Utilisateur {
    static create(values, callback) {
        const sql = "INSERT INTO utilisateurs(idUs, nomUs, prenomUs, foncUs, emailUs) VALUES(?, ?, ?, ?, ?)";
        db.query(sql, values, callback);
    }
    static getAll(callback){
        const sql = "SELECT * FROM utilisateurs"
        db.query(sql, callback)
    }
    static delete(idUs, callback){
        const sql = "DELETE FROM utilisateurs WHERE idUs=?"
        db.query(sql, [idUs], callback)
    }

    static update(idUs, values, callback){
        const sql = "UPDATE utilisateurs SET nomUs = ?, prenomUs = ?,foncUs =?, emailUs=? WHERE idUs= ?";
        db.query(sql, [...values, idUs], callback);
    }

   /* static findByRole(foncUs, callback) {
        const sql = "SELECT * FROM utilisateurs WHERE foncUs = ?";
        db.query(sql, [foncUs], callback);
    }*/


    // static count(callback) {
    //     const sql = "SELECT COUNT(*) as count FROM utilisateurs";
    //     db.query(sql, callback);
    // }
}

module.exports = Utilisateur;
