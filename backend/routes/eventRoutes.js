const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// CRUD Operations
// Criação de um novo evento
router.post('/', async (req, res) => {
    const { name, date, location, description } = req.body;

    try {
        const newEvent = new Event({ name, date, location, description });
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar o evento.' }); // Tratamento de erro
    }
});

// Obtenção de todos os eventos
router.get('/', async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao obter eventos.' }); // Tratamento de erro
    }
});

// Obtenção de um evento específico
router.get('/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: 'Evento não encontrado.' }); // Verificação de evento não encontrado
        res.json(event);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao obter o evento.' }); // Tratamento de erro
    }
});

// Atualização de um evento
router.put('/:id', async (req, res) => {
    try {
        const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedEvent) return res.status(404).json({ message: 'Evento não encontrado.' }); // Verificação de evento não encontrado
        res.json(updatedEvent);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar o evento.' }); // Tratamento de erro
    }
});

// Exclusão de um evento
router.delete('/:id', async (req, res) => {
    try {
        const deletedEvent = await Event.findByIdAndDelete(req.params.id);
        if (!deletedEvent) return res.status(404).json({ message: 'Evento não encontrado.' }); // Verificação de evento não encontrado
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Erro ao excluir o evento.' }); // Tratamento de erro
    }
});

module.exports = router;