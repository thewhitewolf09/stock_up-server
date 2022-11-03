const UserStock = require("../model/UserStockSchema");
const Order = require("../model/orderSchema");
const OrderBook = require("../model/orderbookSchema");
const TradeHistory = require("../model/tradehistorySchema");



// get marketdata = api/v1/marketdata
exports.getmarketdata = async (req, res) => {
    const market_data = await TradeHistory.find().sort({date: -1});

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
    // const tradehistory = await UserStock.find();
    const tradehistory = await TradeHistory.find();

    res.status(200).json({
        success: true,
        tradehistory
    })
}

// get orderbook = api/v1/orderbook
exports.getorderbook = async (req, res) => {
    const order_sell = await Order.find({ buy_sell: 1 }).sort({ price: 1, date: -1 });
    const order_buy = await Order.find({ buy_sell: 0 }).sort({ price: -1, date: -1 });

    order_sell.map((Itemsell) => {
        order_buy.map(async (Itembuy) => {
            if (Itemsell.price === Itembuy.price) {
                if (Itemsell.quantity > Itembuy.quantity) {
                    quantity = (Itemsell.quantity - Itembuy.quantity)
                    await Order.updateOne({name: Itemsell.name},{quantity : quantity});
                    const trade = new TradeHistory({ buy_sell: false, price: Itemsell.price, seller: Itemsell.name, buyer: Itembuy.name, quantity: Itembuy.quantity });
                    trade.save();
                    await Order.deleteOne(Itembuy);
                }
                else if (Itemsell.quantity < Itembuy.quantity) {
                    quantity = Itembuy.quantity - Itemsell.quantity;
                    await Order.updateOne({name: Itembuy.name},{quantity : quantity});
                    const trade = new TradeHistory({ buy_sell: true, price: Itemsell.price, seller: Itemsell.name, buyer: Itembuy.name, quantity: Itemsell.quantity });
                    trade.save();
                    await Order.deleteOne(Itemsell);
                }
                else {
                    const trade = new TradeHistory({ buy_sell: false, price: Itemsell.price, seller: Itemsell.name, buyer: Itembuy.name, quantity: Itemsell.quantity });
                    trade.save();
                    await Order.deleteOne(Itemsell);
                    await Order.deleteOne(Itembuy);
                }
            }
        })
    });


    res.status(200).json({
        success: true,
        order_sell,
        order_buy
        // order_book_sell,
        // order_book_buy
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



