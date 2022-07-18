require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const URL = process.env.MONGODB_URL;
const PORT =  5000;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

//Routes
app.use('/user', require('./routes/userRouter'));
app.use('/api', require('./routes/CategoryRouter'));
app.use('/api', require('./routes/upload'));
app.use('/api', require('./routes/productRouter'));



//Connect to mongodb
mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connection connected.'))
.catch((error) => console.error("MongoDB connection failed:", error.message))



app.listen(PORT, () => {
    console.log(`Server was running at port ${PORT}`);
})