const _ = require("lodash");
const conn = require("../config/conn");
const time = require("../config/time");
const formidable = require("formidable");
const fs = require("fs");
const table = "posts";
const moment = require("moment");

exports.postById = (req, res, next, id) => {
  let query = `SELECT 
               a.id, a.title, a.body, a.photo_path, a.photo_content_type, a.created_at, a.created_by, a.updated_at, a.updated_by, b.name 
               FROM ${table} a 
               LEFT JOIN user b on a.created_by=b.id
               WHERE a.id='${id}'`;

  conn.query(query, (err, resQuery) => {
    if (!err) {
      let query2 = `SELECT*FROM post_likes WHERE post_id=${id}`;
      conn.query(query2, (err, resQuery2) => {
        if (!err) {
          let query3 = `SELECT a.id, a.post_id, a.text, a.created_at, a.created_by, b.name 
                        FROM post_comments a
                        LEFT JOIN user b on a.created_by = b.id
                        WHERE a.post_id=${id}
                        ORDER BY created_at desc`;
          conn.query(query3, (err, resQuery3) => {
            if (!err) {
              array_post_comments = [];
              for (let key in resQuery3) {
                let dataComment = {
                  id: resQuery3[key].id,
                  post_id: resQuery3[key].post_id,
                  text: resQuery3[key].text,
                  created_by: resQuery3[key].created_by,
                  created_at: moment(resQuery3[key].created_at).format(
                    "MM/DD/YYYY hh:mm:ss"
                  ),
                  name: resQuery3[key].name,
                };
                array_post_comments.push(dataComment);
              }
              let data = _.extend(resQuery[0], {
                post_likes: resQuery2,
                post_comments: array_post_comments,
              });
              req.post = data;
              next();
            } else {
              res.json(err);
            }
          });
        } else {
          res.json(err);
        }
      });
    } else {
      res.json(err);
    }
  });
};

exports.getPosts = (req, res) => {
  conn.query(
    `SELECT a.id, a.title, a.body, a.photo_path, a.photo_content_type, a.created_at, a.created_by, b.name, a.updated_at, a.updated_by 
    FROM ${table} a 
    LEFT JOIN user b on a.created_by=b.id
    ORDER BY a.created_at DESC`,
    (err, resQuery) => {
      if (err) {
        res.send({
          info: err,
        });
      } else {
        res.json(resQuery);
      }
    }
  );
};

exports.createPost = (req, res, next) => {
  const user = req.profile;

  let dataInsert = {
    title: req.body.title,
    body: req.body.body,
    photo_path: req.filePath,
    photo_content_type: req.fileContentType,
    created_at: time.currentDateTime(),
    created_by: user.id,
  };

  conn.query(`INSERT INTO ${table} SET ?`, dataInsert, (err, resQuery) => {
    if (!err) {
      res.json({
        message: "Data saved successfully",
        post: dataInsert,
        resQuery,
      });
    } else {
      res.json(err);
    }
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

exports.postPhoto = (req, res, next) => {
  if (req.post.photo_path != null) {
    fs.readFile(req.post.photo_path, (err, data) => {
      if (err) throw err;
      else {
        res.writeHead(200, { "Content-Type": req.post.photo_content_type });
        res.end(data); // Send the file data to the browser.
      }
    });
  } else {
    fs.readFile("./uploads/images/posts/post.jpg", (err, data) => {
      if (err) throw err;
      else {
        res.writeHead(200, { "Content-Type": req.post.photo_content_type });
        res.end(data); // Send the file data to the browser.
      }
    });
  }
};

exports.singlePost = (req, res) => {
  return res.json(req.post);
};

exports.like = (req, res) => {
  let post_id = req.body.post_id;
  let user_id = req.body.user_id;

  let dataInsert = { post_id, user_id };

  let query = `INSERT INTO post_likes SET ?`;

  conn.query(query, dataInsert, (err, resQuery) => {
    if (!err) {
      let query2 = `SELECT*FROM post_likes WHERE post_id=${post_id}`;
      conn.query(query2, (err, resQuery2) => {
        if (!err) {
          res.json(resQuery2);
        } else {
          res.json(err);
        }
      });
    } else {
      res.json(err);
    }
  });
};

exports.unlike = (req, res) => {
  let post_id = req.body.post_id;
  let user_id = req.body.user_id;
  let query = `DELETE FROM post_likes WHERE post_id=${post_id} AND user_id=${user_id}`;

  conn.query(query, (err, resQuery) => {
    if (!err) {
      let query2 = `SELECT*FROM post_likes WHERE post_id=${post_id}`;
      conn.query(query2, (err, resQuery2) => {
        if (!err) {
          res.json(resQuery2);
        } else {
          res.json(err);
        }
      });
    } else {
      res.json(err);
    }
  });
};

exports.comment = (req, res) => {
  let post_id = req.body.post_id;
  let text = req.body.text;
  let created_by = req.body.created_by;
  let created_at = new Date();

  let dataInsert = { post_id, text, created_by, created_at };

  let query = `INSERT INTO post_comments SET ?`;

  conn.query(query, dataInsert, (err, resQuery) => {
    if (!err) {
      let query2 = `SELECT a.id, a.post_id, a.text, a.created_at, a.created_by, b.name 
                    FROM post_comments a
                    LEFT JOIN user b on a.created_by = b.id 
                    WHERE a.post_id=${post_id}
                    ORDER BY created_at desc`;
      conn.query(query2, (err, resQuery2) => {
        if (!err) {
          res.json(resQuery2);
        } else {
          res.json(err);
        }
      });
    } else {
      res.json(err);
    }
  });
};

exports.uncomment = (req, res) => {
  let id = req.body.comment_id;
  let post_id = req.body.post_id;

  let query = `DELETE FROM post_comments WHERE id=${id}`;

  conn.query(query, (err, resQuery) => {
    if (!err) {
      let query2 = `SELECT a.id, a.post_id, a.text, a.created_at, a.created_by, b.name 
                    FROM post_comments a
                    LEFT JOIN user b on a.created_by = b.id 
                    WHERE a.post_id=${post_id}`;
      conn.query(query2, (err, resQuery2) => {
        if (!err) {
          res.json(resQuery2);
        } else {
          res.json(err);
        }
      });
    } else {
      res.json(err);
    }
  });
};
