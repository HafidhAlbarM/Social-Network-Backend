const _ = require("lodash");
const conn = require("../config/conn");
const time = require("../config/time");
const table = "user";
const bcrypt = require("bcrypt");
const saltRounds = 10;
const fs = require("fs");

exports.userById = (req, res, next, id) => {
  let query = `SELECT*FROM ${table} WHERE id='${id}'`;
  conn.query(query, (err, resQuery) => {
    if (!err) {
      if (resQuery.length == 1) {
        query2 = `SELECT a.id, a.user_id, a.follower_id, b.name FROM user_followers a LEFT JOIN user b on a.follower_id = b.id WHERE user_id='${id}'`;
        conn.query(query2, (err, resQuery2) => {
          if (!err) {
            query3 = `SELECT a.id, a.user_id, a.following_id, b.name FROM user_following a LEFT JOIN user b ON a.following_id = b.id WHERE user_id='${id}'`;
            conn.query(query3, (err, resQuery3) => {
              if (!err) {
                _.extend(resQuery[0], {
                  followers: resQuery2,
                  following: resQuery3,
                });
                //mengambah objek profile pada request
                req.profile = resQuery[0];
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
        res.json({ message: "User not found" });
      }
    } else {
      res.json(err);
    }
  });
};

exports.hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile.id == req.auth.id;

  if (!authorized) {
    return res.status(403).json({
      error: "User is not Authorized to perfom this action",
    });
  }
};

exports.allUsers = (req, res) => {
  let query = `SELECT*FROM ${table}`;
  conn.query(query, (err, resQuery) => {
    if (!err) {
      res.json(resQuery);
    } else {
      res.json(err);
    }
  });
};

exports.getUser = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

exports.updateUser = (req, res, next) => {
  let user = req.profile;
  // menambahakan req.body ke variable user dgn lodash
  user = _.extend(user, req.body);
  user.updated_at = time.currentDateTime();

  bcrypt.hash(user.password, saltRounds, function (err, hash) {
    const dataUser = {
      name: user.name,
      email: user.email,
      about: user.about,
      hashed_password: hash == undefined ? user.hashed_password : hash,
      salt: saltRounds,
      photo_content_type: req.fileContentType,
      updated_at: user.updated_at,
    };

    if (req.filePath) {
      dataUser.photo_path = req.filePath;
    }

    let query = `UPDATE ${table} SET ? WHERE id='${user.id}'`;
    conn.query(query, dataUser, (err, resQuery) => {
      if (!err) {
        dataUser.id = user.id;
        dataUser.hashed_password = undefined;
        dataUser.salt = undefined;
        res.json({ message: "user updated successfully", resQuery, dataUser });
      } else {
        res.json(err);
      }
    });
  });
};

exports.deleteUser = (req, res) => {
  let user = req.profile;

  let query = `DELETE FROM ${table} WHERE id=${user.id}`;
  conn.query(query, (err, resQuery) => {
    if (!err) {
      res.json({ message: "user deleted successfully", resQuery });
    } else {
      res.json(err);
    }
  });
};

exports.userIdPhoto = (req, res, next) => {
  if (req.profile.photo_path != null) {
    fs.readFile(req.profile.photo_path, (err, data) => {
      if (err) throw err;
      else {
        res.writeHead(200, { "Content-Type": req.profile.photo_content_type });
        res.end(data); // Send the file data to the browser.
      }
    });
  } else {
    fs.readFile("./uploads/images/ava.png", (err, data) => {
      if (err) throw err;
      else {
        res.writeHead(200, { "Content-Type": req.profile.photo_content_type });
        res.end(data); // Send the file data to the browser.
      }
    });
  }
};

exports.addFollowing = (req, res, next) => {
  let user_id = req.body.userId;
  let following_id = req.body.following_id;

  let query = "INSERT INTO user_following SET ?";
  let dataInsert = {
    user_id,
    following_id,
  };

  conn.query(query, dataInsert, (err, resQuery) => {
    if (!err) {
      next();
    } else {
      res.json(err);
    }
  });
};

exports.addFollwer = (req, res, next) => {
  let user_id = req.body.following_id;
  let follower_id = req.body.userId;

  let query = "INSERT INTO user_followers SET ?";
  let dataInsert = {
    user_id,
    follower_id,
  };

  conn.query(query, dataInsert, (err, resQuery) => {
    if (!err) {
      query = `SELECT*FROM ${table} WHERE id='${user_id}'`;
      conn.query(query, (err, resQuery) => {
        if (!err) {
          if (resQuery.length == 1) {
            query2 = `SELECT a.id, a.user_id, a.follower_id, b.name FROM user_followers a LEFT JOIN user b ON a.follower_id = b.id WHERE follower_id='${follower_id}'`;
            conn.query(query2, (err, resQuery2) => {
              if (!err) {
                query3 = `SELECT a.id, a.user_id, a.following_id, b.name FROM user_following a LEFT JOIN user b ON a.following_id = b.id WHERE user_id='${user_id}'`;
                conn.query(query3, (err, resQuery3) => {
                  if (!err) {
                    _.extend(resQuery[0], {
                      followers: resQuery2,
                      following: resQuery3,
                    });
                    res.json(resQuery[0]);
                  } else {
                    res.json(err);
                  }
                });
              } else {
                res.json(err);
              }
            });
          } else {
            res.json({ message: "User not found" });
          }
        } else {
          res.json(err);
        }
      });
    } else {
      res.json(err);
    }
  });
};

exports.removeFollowing = (req, res, next) => {
  let user_id = req.body.userId;
  let unfollow_id = req.body.unfollow_id;

  let query = `DELETE FROM user_following WHERE user_id='${user_id}' AND following_id='${unfollow_id}'`;

  conn.query(query, (err, resQuery) => {
    if (!err) {
      next();
    } else {
      res.json(err);
    }
  });
};

exports.removeFollwer = (req, res, next) => {
  let unfollow_id = req.body.unfollow_id;
  let user_id = req.body.userId;

  let query = `DELETE FROM user_followers WHERE user_id='${unfollow_id}' AND follower_id='${user_id}'`;

  conn.query(query, (err, resQuery) => {
    if (!err) {
      queryNya = `SELECT*FROM ${table} WHERE id='${unfollow_id}'`;

      conn.query(queryNya, (err, resQuery) => {
        if (!err) {
          if (resQuery.length == 1) {
            query2 = `SELECT a.id, a.user_id, a.follower_id, b.name FROM user_followers a LEFT JOIN user b ON a.follower_id = b.id WHERE user_id='${unfollow_id}'`;
            console.log(query2);
            conn.query(query2, (err, resQuery2) => {
              if (!err) {
                query3 = `SELECT a.id, a.user_id, a.following_id, b.name FROM user_following a LEFT JOIN user b ON a.following_id = b.id WHERE user_id='${unfollow_id}'`;
                conn.query(query3, (err, resQuery3) => {
                  if (!err) {
                    _.extend(resQuery[0], {
                      followers: resQuery2,
                      following: resQuery3,
                    });
                    res.json(resQuery[0]);
                  } else {
                    res.json(err);
                  }
                });
              } else {
                res.json(err);
              }
            });
          } else {
            res.json({ message: "User not found" });
          }
        } else {
          res.json(err);
        }
      });
    } else {
      res.json(err);
    }
  });
};
