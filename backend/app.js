// server.js
//require('dotenv').config()
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//const sendEmail = require('nodemailer');


app.use(express.json());
app.use(cors());
//app.use(sendEmail())

const authRoutes = require('./routes/authRoutes');
const materielRoutes = require('./routes/materielRoutes');
const utilisateurRoutes = require('./routes/utilisateurRoutes');
const empruntRoutes = require('./routes/empruntRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

app.use('/api', dashboardRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', materielRoutes);
app.use('/api', utilisateurRoutes);
app.use('/api', empruntRoutes);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
