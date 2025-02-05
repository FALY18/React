// controllers/dashboardController.js
const Dashboard = require('../models/dashboardModel');

const getDashboardData = (req, res) => {
    Dashboard.getData((err, data) => {
        if (err) {
            console.error('Erreur lors de la récupération des données du dashboard:', err);
            return res.status(500).json({ error: "Une erreur s'est produite" });
        }
        return res.json(data);
    });
};

module.exports = {
    getDashboardData,
};
