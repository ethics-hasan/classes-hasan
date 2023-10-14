const mongoose = require('mongoose');
require('dotenv/config')
mongoose.Promise = global.Promise;
mongoose.connect(process.env.databaseAltamash, { useNewUrlParser: true }).then(() => {
    console.log("Connected to MongoDB successfully :)");
}).catch((e) => {
    console.log("Error while attempting to connect to MongoDB");
    console.log(e);
});




module.exports = {
    mongoose
};