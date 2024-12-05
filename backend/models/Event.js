const mongoose = require('mongoose');

const { Schema } = mongoose; // Desestruturação para maior clareza

const EventSchema = new Schema({
    name: {
        type: String,
        required: [true, 'O nome do evento é obrigatório.'] // Mensagem de erro personalizada
    },
    date: {
        type: Date,
        required: [true, 'A data do evento é obrigatória.'] // Mensagem de erro personalizada
    },
    location: {
        type: String,
        required: [true, 'A localização do evento é obrigatória.'] // Mensagem de erro personalizada
    },
    description: {
        type: String,
        required: [true, 'A descrição do evento é obrigatória.'] // Mensagem de erro personalizada
    },
    participants: [{
        type: Schema.Types.ObjectId,
        ref: 'Participant'
    }]
});

// Exportando o modelo
module.exports = mongoose.model('Event', EventSchema);