const _ = require("lodash");
const conn = require("../config/conn");
const time = require("../config/time");
const formidable = require("formidable");
const fs = require("fs");
const table = "posts";

exports.postById = (req, res, next, id) => {
  let query = `SELECT*FROM ${table} WHERE id='${id}'`;
  conn.query(query, (err, resQuery) => {
    if (!err) {
      req.post = resQuery[0];
      next();
    } else {
      res.json(err);
    }
  });
};

exports.getPosts = (req, res) => {
  conn.query(`SELECT*FROM ${table}`, (err, resQuery) => {
    if (err) {
      res.send({
        info: err,
      });
    } else {
      res.json({
        posts: resQuery,
      });
    }
  });
};

exports.createPost = (req, res, next) => {
  let form = new formidable.IncomingForm();
  const user = req.profile;
  let photo = {};

  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      res.status(400).json(err);
    }

    if (files.photo) {
      photo.data = fs.readFileSync(files.photo.path);
      photo.contentType = files.photo.type;
    }

    let dataInsert = {
      title: fields.title,
      body: fields.body,
      created_at: time.currentDateTime(),
      created_by: user.id,
    };

    conn.query(`INSERT INTO ${table} SET ?`, dataInsert, (err, resquery) => {
      res.json({
        message: "Data saved successfully",
        post: dataInsert,
        resQuery,
      });
    });
  });
};

exports.postsByUser = (req, res) => {
  const id = req.profile.id;
  let query = `SELECT*FROM ${table} WHERE created_by='${id}'`;
  conn.query(query, (err, resQuery) => {
    if (!err) {
      res.status(200).json(resQuery);
    } else {
      res.json(err);
    }
  });
};

exports.isPoster = (req, res, next) => {
  const isPoster = req.post && req.auth && req.post.created_by == req.auth.id;
  if (!isPoster) {
    return res.status(403).json({
      error: "User is not authorized (isPoster)",
    });
  }

  next();
};

exports.updatePost = (req, res) => {
  let post = req.post;
  let auth = req.auth;
  post = _.extend(post, req.body);
  post.updated_at = time.currentDateTime();

  dataUpdate = {
    title: post.title,
    body: post.body,
    updated_at: post.updated_at,
    updated_by: auth.id,
  };
  let query = `UPDATE ${table} SET ? WHERE id='${post.id}'`;
  conn.query(query, dataUpdate, (err, resQuery) => {
    if (!err) {
      res.status(200).json({
        message: "Data updated successfully",
        post: dataUpdate,
        resQuery,
      });
    } else {
      res.json(err);
    }
  });
};

exports.deletePost = (req, res) => {
  const postId = req.post.id;
  console.log(postId);
  let query = `DELETE FROM ${table} WHERE id='${postId}'`;
  conn.query(query, (err, resQuery) => {
    if (!err) {
      res.status(200).json({
        message: "Data deleted successfully",
        resQuery,
      });
    } else {
      res.send(err);
    }
  });
};
