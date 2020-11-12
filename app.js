const express = require('express');
const app = express();
const morgan = require('morgan');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const fs = require('fs');
const cors = require('cors');

const expressValidator = require('express-validator');
dotenv.config()

//routes
const postRoutes = require('./routes/post');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const { json } = require('body-parser');
//API docs
app.get("/", (req, res) => {
    fs.readFile('docs/APIdocs.json', (err, result) => {
        if(err){
            res.status(400).json({error: err});
        }

        const docs = JSON.parse(result);
        res.json(docs);
    })
});

//middleware
//morgan untuk mencatat log request API
app.use(morgan('dev'));
app.use(bodyParser.json())
app.use(expressValidator());
app.use(cookieParser());
app.use(cors());

app.use("/", postRoutes);
app.use("/", authRoutes);
app.use("/", userRoutes);
app.use((err, req, res, next) => {
    if(err.name === "UnauthorizedError"){
        res.status(401).json({error:"Unauthorized Error"});
    }
});

app.listen(process.env.PORT || 8081, ()=>{
    console.log('berjalan di port 8081');
});