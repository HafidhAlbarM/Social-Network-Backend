const mysql = require('mysql');

//database
const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

conn.connect((err)=>{
    if(!err){
        console.log("Berhasil terkoneksi ke database");
    }else{
        console.log("Gagal terkonski ke database");
    }
});

module.exports = conn;