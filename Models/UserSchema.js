const mongoose = require('mongoose');
const Scheama = mongoose.Schema;

const patientScheama = new Scheama ({
    nom: {
        type: String,
        required: [true,'nom is requiered']
    },
    // prenom: {
    //     type: String,
    //     required:[true, 'prenom is required']
    // },
    email: {
        type: String,
        required: [true, 'email is required']
    },  
    // tel: {
    //     type: Number,
    //     required: [true, 'phone number is required']
    // },
    datePoste: {
        type:String,
        default:new Date().getDate()
    },
    password: {
        type: String,
    required:[true, 'password is required']
    },
    // confirmPassword: {
    //     type: String,
    //     required: [ true, 'confirm your password']
    // },
    

});

const patientModel = mongoose.model('User',patientScheama)

module.exports = patientModel
