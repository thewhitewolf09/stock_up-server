const express = require('express');
const router = express.Router()


const {getmarketdata} = require("../controller/marketController");


//api/v1/products 
router.route("/marketdata").get(getmarketdata); 




module.exports = router;  