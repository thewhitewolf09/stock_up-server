const mongoose = require('mongoose')
const DB = process.env.DATABASE

mongoose.connect(DB+"/stockupDB").then(() => {
    console.log('Connection successful');
}).catch((err) => {
    console.log(err);
})   