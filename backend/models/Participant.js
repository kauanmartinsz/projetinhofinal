const mongoose = require('mongoose');

const { Schema } = mongoose; // Desestruturação para maior clareza

const ParticipantSchema = new Schema({
    name: {
        type: String,
        required: [true, 'O nome do participante é obrigatório.'] // Mensagem de erro personalizada
    },
    email: {
        type: String,
        required: [true, 'O email do participante é obrigatório.'], // Mensagem de erro personalizada
        unique: true, // Adicionando a restrição de unicidade para o email
        match: [/.+@.+\..+/, 'Por favor, insira um email válido.'] // Validação de formato de email
    },
    events: [{
        type: Schema.Types.ObjectId,
        ref: 'Event'
    }]
});

// Exportando o modelo
module.exports = mongoose.model('Participant', ParticipantSchema);