const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
});

const Contact = mongoose.model('Contact', contactSchema); //name and schema for db

module.exports = Contact;

