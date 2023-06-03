const mongoose = require('mongoose');

mongoose.connect(
    // "mongodb://localhost:27017/foxinema-api",
    "mongodb+srv://foxinema:UoSae3sBPC16Mxeu@foxinema.6orjdqk.mongodb.net/Foxinema",
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if
            (!err) console.log("MongoDB Connected");
        else
            console.log("Connection error : " + err)
    }
)