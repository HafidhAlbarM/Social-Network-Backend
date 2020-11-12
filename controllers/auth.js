const conn = require('../config/conn');
const time = require('../config/time');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const bcrypt = require("bcrypt");
const saltRounds = 10;
const table = "user";

exports.signup = (req, res) => {
    return new Promise((resolve, reject)=>{
        const { name, email, password } = req.body;
        let query = `SELECT*FROM ${table} WHERE email='${email}'`;
        

        conn.query(query, (err, resQuery) => {
            if(!err){
                if(resQuery.length==0){
                    bcrypt.hash(password, saltRounds, function(err, hash) {
                        const dataUser = {
                            'name': name,
                            'email': email,
                            'hashed_password': hash,
                            'salt': saltRounds,
                            'created_at': time.currentDateTime()
                        }
                        query = `INSERT INTO ${table} SET ?`;
                        conn.query(query, dataUser, (err, resQuery2) => {
                            if(!err){
                                resolve(res.status(200).json({message:"Registration success", resQuery2}));
                            }else{
                                reject(err);
                            }
                        })
                    });
                }else{
                    resolve(res.json({error:"Email has already taken"}));
                }
            }else{
                reject(res.json({err}));
            }
        });

    });   
}

exports.signin = (req, res) => {
    const { email, password } = req.body;

    let sql = `SELECT*FROM user WHERE email = '${email}'`;
    conn.query(sql, (req, resQuery)=>{
        if(resQuery.length == 1){
            let hash = resQuery[0].hashed_password;
            bcrypt.compare(password, hash, function(err, result) {
                if(result){
                    //response cookie
                    const token = jwt.sign({id: resQuery[0].id}, process.env.JWT_SECRET);
                    res.cookie("t", token, {expire: new Date() + 999});

                    //response yang di tampilkan ke client
                    const {id, email, name} = resQuery[0];
                    return res.json({token, user: {id, email, name}})
                }else{
                    res.json({
                        error: "Wrong password"
                    });
                }
            });
        }else{
            res.json({
                error: "User with that email is not exist"
            });
        }
    });    
}

exports.signout = (req, res) => {
    res.clearCookie("t");
    return res.json({message: "Signout Success"});
}

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    userProperty: "auth"
});