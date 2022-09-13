const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    username: { type: String, unique: true, required: true },
    hash: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    link: { type: String, unique:true, required: true },
    nacionalidad: { type: String, required: true },
    ciudad: { type: String, required: true },
    edad: { type: Number, required: true },
    altura: { type: Number, required: false },
    peso: { type: Number, required: false },
    email: { type: String, required: false },
    movil: { type: Number, required: false },
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

module.exports = mongoose.model('Empleados', schema);