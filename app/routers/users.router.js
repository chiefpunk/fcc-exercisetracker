let express = require('express');
let router = express.Router();
const User = require("../models/users");

// POST endpoint to create a new user
router.post('/new-user', function(req, res){
  const body = req.body;
  const newUser = new User({
    userName: body.username,
  })
  newUser.save(function(err, result) {
    if (err) {
      console.log(err);
      res.send(err);
    }
    res.send({
      username: newUser.userName,
      id: newUser._id,
    });
  })
})

// GET list of all users
router.get('/users', function(req, res){
  User.find({}).then(function (users) {
    var userMap = [];
    users.forEach(function(user, index) {
      userMap.push({
        id: user._id,
        username: user.userName,
      })
    })
    res.send(userMap);
  })
})

// POST add exercises to a particular user
router.post('/add', function(req, res){
  const body = req.body;
  if(!body.description || !body.duration){
    return res.json({error: "Must provide exercise duration and description"})
  }
  // Make exercise doc
  const exercise = {
    "description" : body.description,
    "duration" : body.duration,
  };
  // If date not null, add the date
  if (body.date) {
    exercise.date = new Date(body.date);
  }
  // execute the update query
  User.findOneAndUpdate({_id: body.userId}, {"$push": {"exercise": exercise}}, {new: true}, (err, doc)=> {
    if (err) {
      return res.json(err);
    }
    res.json({
      "username": doc.userName,
      "description": body.description,
      "duration": body.duration,
      "_id": body.userId,
      "date": body.date? new Date(body.date) : new Date()
    })
  })
})

// GET user log of all exercises
router.get('/log', function(req, res){
  if(req.query.userId === undefined){
    res.json({error: "UserID is Required"});
  }
  else{
    User.findById(req.query.userId,  function (err, user) {
      if (err) {
        return res.json({error: "Unknown User"});
      }
      const limit = Number(req.query.limit);
      const from = (req.query.from) ? new Date(req.query.from) : null;
      const to = (req.query.to) ? new Date(req.query.to) : null;

      const resp = {
        "_id": user._id,
        "username": user.userName,
        "count": user.exercise.length,
        "log": user.exercise
      };
      if (from) {
        resp.log = user.exercise.filter(x => x.date > from);
      }
      if (to) {
        resp.log = user.exercise.filter(x => x.date < to);
      }
      if (limit > 0) {
        resp.log = user.exercise.slice(0, limit);
      }
      return res.json({resp});
    })
  }
})
module.exports = router;
