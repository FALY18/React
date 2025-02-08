const db = require('./db');

class Materiel {
    static getAll(callback) {
        const sql = 'SELECT * FROM materiels';
        db.query(sql, callback);
    }

    static create(values, callback) {
        const sql = 'INSERT INTO materiels(id, nomMat, qteMat, etatMat) VALUES(?, ?, ?, ?)';
        db.query(sql, values, callback);
    }

    static update(id, values, callback) {
        const sql = 'UPDATE materiels SET nomMat = ?, qteMat = ?, etatMat = ? WHERE id = ?';
        db.query(sql, [...values, id], callback);
    }

    static delete(id, callback) {
        const sql = 'DELETE FROM materiels WHERE id = ?';
        db.query(sql, [id], callback);
    }
}

module.exports = Materiel;
