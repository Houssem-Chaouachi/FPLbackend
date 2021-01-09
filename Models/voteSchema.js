const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sujet = new Schema ({
    title:{
        type: String,
        required: [true, 'Title is required']
    },
    description:{
        type: String,
        required:[true, 'description is required']
    },
    choix:{ type:String},
    oui: { type: Number, default:0},
    non: { type: Number, default:0},
    totale : {type:Number, default:0},

    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    voteid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
})
const ModuleSondage = mongoose.model('Subject',sujet)
module.exports = ModuleSondage