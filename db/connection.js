const mongoose = require('mongoose')
const DB = process.env.DATABASE

mongoose.connect("mongodb://127.0.0.1:27017/test").then(() => {
    console.log('Connection successful');
}).catch((err) => {
    console.log(err);
})  