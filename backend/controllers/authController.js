const db = require('../models/db');
require('dotenv').config()
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const authController = {
    login: (req, res) => {
        const email = req.body.email; 
        const password = req.body.password;
        const sql = "SELECT * FROM login WHERE username = ? AND password = ?";
        
        db.query(sql, [email, password], (err, data) => {
            if (err) return res.json("Error");
            if (data.length > 0) {
                
                const currentDateTime = new Date();
                const dateTimeString = currentDateTime.toLocaleString('fr-FR', { timeZone: 'Europe/Paris' });

                const mailOptions = {
                    from: process.env.EMAIL_USER,
                    to: email, 
                    subject: 'Connexion réussie',
                    text: `Vous vous êtes connecté avec succès à votre compte le ${dateTimeString}.`
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.error(error);
                        return res.json("Erreur lors de l'envoi de l'email, mais vous êtes connecté.");
                    } else {
                        console.log('Email envoyé: ' + info.response);
                        return res.json("Connecté avec succès");
                    }
                });
            } else {
                return res.json("Email ou mot de passe incorrect! Veuillez vérifier!");
            }
        });
    },
    signup:(req,res) => {
        const user = req.body.users
        const email = req.body.email
        const password = req.body.password
        const sql = "INSERT INTO login(users,username,password) values(?, ?, ?)"
        db.query(sql, [user,email,password], (err,data) => {
            if(err) {
                return res.json('Error')
            }else{
                return res.json('signup success')
            }
            
        });
    }
};

module.exports = authController;
