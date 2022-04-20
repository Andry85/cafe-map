const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const pinRoute = require('./routes/pins');

const app = express();

dotenv.config();


app.use(express.json());

mongoose.connect(process.env.MONGO_URL, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(()=> {
    console.log('MongoDB connected');
}).catch((errr) => console.log(errr));


app.post("users/register/");

app.use('/api/pins', pinRoute);

app.listen(8800, () => {
    console.log('Backend server is running eder');
  })