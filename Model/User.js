const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    notes: {
        type: Array
    },
    notesNum: {
        type: Number,
    }
})

module.exports = User = mongoose.model('user', UserSchema);