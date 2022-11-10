
const mongoose = require('mongoose');
const dotenv= require('dotenv');
// require(dotenv).config();
const app = require('./app');

mongoose.connect("mongodb://localhost:27017/authmessage").then(() => {
    console.log("mongodb connection established")
}).catch((err) => {
    console.log("mongodb connection error")
})
// const port = process.env.PORT || 6000;
app.listen(6000, () => {
    console.log(`connection successfull`);
})