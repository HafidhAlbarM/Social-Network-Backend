const _ = require('lodash');
const conn = require('../config/conn');
const time = require('../config/time');
const table = "user";

exports.userById = (req, res, next, id) => {
    let query = `SELECT*FROM ${table} WHERE id='${id}'`;
    conn.query(query, (err, resQuery) => {
        if(!err){
            if(resQuery.length == 1){
                //mengambah objek profile pada request
                req.profile = resQuery[0];
                next();
            }else{
                res.json({message: "User not found"});
            }
        }else{
            res.json(err);
        }
    });
}

exports.hasAuthorization = (req, res, next) => {
    const authorized = req.profile && req.auth && req.profile.id == req.auth.id;

    if(!authorized){
        return res.status(403).json({
            error: "User is not Authorized to perfom this action"
        });
    }
}

exports.allUsers = (req, res) => {
    let query = `SELECT*FROM ${table}`;
    conn.query(query, (err, resQuery) => {
        if(!err){
            res.json(resQuery);
        }else{
            res.json(err);
        }
    });
}

exports.getUser = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
}

exports.updateUser = (req, res, next) => {
    let user = req.profile;
    //menambahakan req.body ke variable user dgn lodash
    user = _.extend(user, req.body);
    user.updated_at = time.currentDateTime();
    
    let query = `UPDATE ${table} SET ? WHERE id='${user.id}'`;
    conn.query(query, user, (err, resQuery) => {
        if(!err){
            res.json({message:"user updated successfully", resQuery});
        }else{
            res.json(err);
        }
    });
}

exports.deleteUser = (req, res) => {
    let user = req.profile;

    let query = `DELETE FROM ${table} WHERE id=${user.id}`;
    conn.query(query, (err, resQuery) => {
        if(!err){
            res.json({message:"user deleted successfully", resQuery});
        }else{
            res.json(err);
        }
    })
}