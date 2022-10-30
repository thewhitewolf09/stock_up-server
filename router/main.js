const express = require('express');
const router = express.Router()


const {getmarketdata,makeorder,getuserportfolio,postuserportfolio,getorderbook} = require("../controller/marketController");


//api/v1/marketdata       http://localhost:5000/api/v1/marketdata
router.route("/marketdata").get(getmarketdata); 


//api/v1/order       http://localhost:5000/api/v1/order
router.route("/order").post(makeorder);

//api/v1/postuserportfolio      http://localhost:5000/api/v1/postuserportfolio 
router.route("/postuserportfolio").post(postuserportfolio);

//api/v1/userportfolio      http://localhost:5000/api/v1/userportfolio 
router.route("/userportfolio").get(getuserportfolio);

//api/v1/orderbook       http://localhost:5000/api/v1/orderbook 
router.route("/orderbook").get(getorderbook);

module.exports = router;  