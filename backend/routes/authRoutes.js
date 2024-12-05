const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User'); // Você precisará criar um modelo de usuário

// Registro de usuário
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser  = new User({ username, password: hashedPassword });
        await newUser .save();
        res.status(201).send('Usuário registrado com sucesso.');
    } catch (error) {
        res.status(500).send('Erro ao registrar o usuário.'); // Tratamento de erro
    }
});

// Login de usuário
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(400).send('Usuário não encontrado.');

        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass) return res.status(400).send('Senha inválida.');

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        res.header('Authorization', token).send(token);
    } catch (error) {
        res.status(500).send('Erro ao fazer login.'); // Tratamento de erro
    }
});

module.exports = router;