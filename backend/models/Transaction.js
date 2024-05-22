const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    registration_number: { type: String, required: true, unique: true },
    entry_date: { type: Date, required: true },
    departure_date: { type: Date}, 
    fee: {type: Number, min:1, max:2},
    amount:{type:Number,min:0,max:999999},
    type_vehicle:{type:String,required:true},
    helmets_number:{type:Number,min:0,max:2}
});

module.exports = mongoose.model('Transaction', transactionSchema);