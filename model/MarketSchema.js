const mongoose = require('mongoose')

const marketSchema = new mongoose.Schema({
    product_name: {
        type: String,
    },
    product_image_url: {
        type: String,  
    },
    product_price: {
        type: String, 
    }
})

module.exports = mongoose.model("MarketData", marketSchema);