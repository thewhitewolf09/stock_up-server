const UserStock = require("../model/UserStockSchema");
const Order = require("../model/OrderSchema");



// get marketdata = api/v1/marketdata
exports.getmarketdata = async (req, res) => {
    const market_data = await UserStock.find();

    res.status(200).json({
        success: true,
        market_data
    })
}

// post userportfolio = api/v1/userportfolio
exports.postuserportfolio = async (req, res) => {
    const { user_name, quantity, portfolio_value } = req.body

    const UserExist = await UserStock.findOne({ user_name })

    if (UserExist) {
        await UserStock.updateOne({ user_name, quantity, portfolio_value });
    }
    else {
        const userportfolio = new UserStock({ user_name, quantity, portfolio_value });
        await userportfolio.save();
    }

    res.status(200).json({
        success: true,
    })
}

// post userportfolio = api/v1/userportfolio
exports.getuserportfolio = async (req, res) => {
    const userportfolio = await UserStock.find();
    res.status(200).json({
        success: true,
        userportfolio
    })
}
// get tradehistory = api/v1/tradehistory

exports.gettradehistory = async (req, res) => {
    const tradehistory = await UserStock.find();

    res.status(200).json({
        success: true,
        tradehistory
    })
}

// get orderbook = api/v1/orderbook
exports.getorderbook = async (req, res) => {
     const order_sell = await Order.find({buy_sell: 1}).sort({price: 1, date: -1});
     const order_buy = await Order.find({buy_sell: 0}).sort({price: -1, date: -1});
    
     const order_book_sell = [[]];
     const order_book_buy = [[]];

     new_order = await Order.findOne();
     
      
    //  order_sell.map((eachItem) => {
    //         if(!order_book_sell.includes(eachItem.price)){
    //             order_book_sell.push([eachItem.price, eachItem.quantity]);
    //         }
    //         else{

    //         }
    //  });
    //  const addSimilar = (arr) => {
    //  addSimilar(order_sell);

    res.status(200).json({
        success: true,
        order_sell,
        order_buy
    })
}

// post order = api/v1/order
exports.makeorder = async (req, res) => {
    const { buy_sell, price, name, quantity, market_type } = req.body
    const order_data = new Order({ buy_sell, price, name, quantity, market_type })
    await order_data.save();
    res.status(200).json({
        success: true
    })
}


// get notification = api/v1/notification
exports.getnotification = async (req, res) => {
    const notification = await UserStock.find();

    res.status(200).json({
        success: true,
        notification
    })
}



