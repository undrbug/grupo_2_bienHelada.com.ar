const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');


const contactController = {
    contact: (req, res) => {
        res.render('contact/contact.ejs', {title: 'Contacto'});
    },
    sendMail: async (req, res) =>  {
        try {
            const { name, email, message } = req.body;
        const messageHtml = `<h3>Mensaje de ${name}</h3>
        <p>${message}</p>
        <p>Responder a: ${email}</p>`;
            const transporter = nodemailer.createTransport({
                host: process.env.HOST,
                port: process.env.HOST_PORT,
                secure: true,
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                },
                tls: {
                    rejectUnauthorized: false
                }
            })
            const mailOptions = {
                from: process.env.FROM,
                to: process.env.TO,
                subject: process.env.SUBJECT,
                html: messageHtml,
            }
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                    res.send(error.message);
                } else {
                    console.log('Email sent: ' + info.response);
                    res.redirect("/");
                }
            })
        } catch (error) {
            console.log("ERROR: ", error.message);
        }
    },
    sendForgotPasswordEmail: async (req, res) => {
        try {
            const { email } = req.body;
            const messageHtml = `<h2>Recuperación de contraseña</h2>
            <h4>Has solicitado recuperar tu contraseña.</h4>
            <p>Para recuperar tu contraseña, haz click en el siguiente enlace:</p>
            <a href="${process.env.URL}/users/reset-password/${token}">Recuperar contraseña</a>`;
            const transporter = nodemailer.createTransport({
                host: process.env.HOST,
                port: process.env.HOST_PORT,
                secure: true,
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                },
                tls: {
                    rejectUnauthorized: false
                }
            })
            const mailOptions = {
                from: process.env.FROM,
                to: email,
                subject: 'Recuperación de contraseña',
                html: messageHtml,
            }
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(`Error: ${error.message}`);
                } else {
                    console.log('Email sent: ' + info.response);
                    res.redirect("/");
                }
            })
        } catch (error) {
            console.log("ERROR: ", error.message);
        }
    },
    updatePassword: async (req, res) => {
        try {
            const { password } = req.body;
            const hashPassword = bcrypt.hashSync(password, 10);
            await servicesDB.updatePassword(hashPassword, req.params.id);
            res.redirect('/');
        } catch (error) {
            console.log("ERROR: ", error.message);
        }
    }
    
}

module.exports = contactController;