const mongoose = require('mongoose')

const tradeHistorySchema = new mongoose.Schema({
    buy_sell: {
        type: Boolean,
        required: true
    },
    price: {
        type: Number,
        default : 0,
    },
    seller: {
        type: String,
        required: true
    },
    buyer:{
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
    
})

module.exports = mongoose.model("TradeHistory", tradeHistorySchema);