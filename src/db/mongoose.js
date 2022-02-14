const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/book-inventory', {
    useNewUrlParser: true
}).then(() => {
    console.log("Connected");
}).catch((e) => {
    console.log('Connection failed.', e)
});