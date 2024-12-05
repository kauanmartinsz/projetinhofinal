const mongoose = require('mongoose');

const { Schema } = mongoose; // Desestruturação para maior clareza

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'O nome de usuário é obrigatório.'], // Mensagem de erro personalizada
        unique: true,
        trim: true // Remove espaços em branco antes e depois do nome de usuário
    },
    password: {
        type: String,
        required: [true, 'A senha é obrigatória.'], // Mensagem de erro personalizada
        minlength: [6, 'A senha deve ter pelo menos 6 caracteres.'] // Validação de comprimento mínimo
    }
});

// Exportando o modelo
module.exports = mongoose.model('User ', UserSchema);