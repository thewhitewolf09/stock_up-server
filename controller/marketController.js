const MarketData = require("../model/MarketSchema");




// get product = api/v1/products?keyword=apple
exports.getmarketdata = async (req, res, next) => {
    const market_data = await MarketData.find();

    res.status(200).json({
        success: true,
        market_data
    })
} 

