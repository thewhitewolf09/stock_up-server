const mongoose = require('mongoose')

const orderBookSchema = new mongoose.Schema({
    buy_sell: {
        type: Boolean,
        required: true
    },
    price: {
        type: Number,
        default : 0,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    name:{
        type:String,
        required: true
    }
})

module.exports = mongoose.model("OrderBook", orderBookSchema);