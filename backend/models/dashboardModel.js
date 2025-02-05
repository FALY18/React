// models/dashboardModel.js
const db = require('./db');

class Dashboard {
    static getData(callback) {
        const sql = `
            SELECT 
                (SELECT COUNT(*) FROM utilisateurs) AS utilisateurs,
                (SELECT COUNT(*) FROM emprunts) AS emprunts,
                (SELECT COUNT(*) FROM materiels) AS materiels
        `;
        db.query(sql, (err, results) => {
            if (err) {
                console.error('Erreur lors de la récupération des données du dashboard:', err);
                return callback(err, null);
            }
            return callback(null, results[0]);
        });
    }
}

module.exports = Dashboard;
