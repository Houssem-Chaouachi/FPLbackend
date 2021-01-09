const mongoose = require('mongoose');
const Scheama = mongoose.Schema;

const userScheama = new Scheama ({
    name: {
         type: String, 
         required: [true, 'name is required' ]
        },
    email: {
         type: String, 
         required:[ true, 'email is required']
         },
    password: { 
        type: String,
         required: [true, 'password required' ]
    },
    confirmPassword: {
        type: String,
        required: [ true, 'confirm your password']
    },
    

});

const patientModel = mongoose.model('User',userScheama)

module.exports = patientModel
