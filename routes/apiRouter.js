let Router = require('express').Router;
const apiRouter = Router()
let helpers = require('../config/helpers.js')

let User = require('../db/schema.js').User
let Group = require('../db/groupSchema.js').Group
let Message = require('../db/messageSchema').Message
let Reply = require('../db/replySchema').Reply
  
  apiRouter
    .get('/users', function(req, res){  
      User.find(req.query , "-password", function(err, results){
        if(err) return res.json(err) 
        res.json(results)
      }).populate('groups')
    })

  apiRouter
    .get('/users/:_id', function(req, res){
      User.findById(req.params._id, "-password", function(err, record){
        if(err || !record ) return res.json(err) 
        res.json(record)
      }).populate('groups')
    })

  apiRouter
    .get('/users/:_id/groups', function(req, res){
      User.findById(req.params._id, "-password", function(err, record){
        if(err || !record ) return res.json(err) 
        res.json(record.groups)
      }).populate('groups')
    })

  apiRouter
    .get('/users/', function(req, res){
      User.find(req.query, function(err, record){
        if(err || !record ) return res.json(err) 
        res.json(record)
      }).populate('groups')
    })

  apiRouter
    .delete('/users/:_id', function(req, res){
      User.remove({ _id: req.params._id}, (err) => {
        if(err) return res.json(err)
        res.json({
          msg: `record ${req.params._id} successfully deleted`,
          _id: req.params._id
        })
      })  
    })

    //---------------------------------------------------------------
    //                    ROUTES FOR GROUP
    //---------------------------------------------------------------
 apiRouter
    .get('/groups', function(req, res){
      Group.find(req.query , function(err, results){
        if(err) return res.json(err) 
        res.json(results)
      }).populate('members')
    })

  apiRouter
    .get('/groups/:_id', function(req, res){
      Group.findById(req.params._id, function(err, record){
        if(err || !record ) return res.json(err) 
        res.json(record)
      }).populate('members')
    })
  apiRouter
    .put('/groups/:_groupID/users/:_userID', function(req, res){

      Group.findById(req.params._groupID, function(err, group_record){
          if (err) {
            res.status(500).send(err)
          }
          else if (!group_record) {
            return res.status(400).send('no group record found with that id')
          }
          else {
            User.findById(req.params._userID, function(err, user_record){
              if (err) {
                 return res.status(500).send(err)
              }
              else if (!user_record) {
                 return res.status(400).send('no user record found with that id')
              }
              else {
                user_record.groups.push(group_record)
                user_record.save(function(err){
                  if (err) {
                    return res.status(500).send(err)
                  }
                });
                group_record.members.push(user_record)
                group_record.save(function(err){
                  if (err) {
                     return res.status(500).send(err)
                  }
                   else {
                    res.json(user_record)
                  }
                });                
              }
            })
          }
      })
    })

   apiRouter
  .post('/groups', function(req, res){

    let newGroup = new Group(req.body)

    Group.find({name: req.body.name}, function(err, results){
      if (err) return res.status(500).send('error saving querying db for user')

      if(results !== null && results.length > 0 ) { 
        return res.status(401).send(`oops, record for <${req.body.name}> already exists`)
      }
      newGroup.save(function(err, record){
        if(err) return res.status(500).send('server/db error on attempt to save user to db')
        res.json(newGroup)
      })
    })
  })

  apiRouter
    .delete('/groups/:_id', function(req, res){
      User.remove({ _id: req.params._id}, (err) => {
        if(err) return res.json(err)
        res.json({
          msg: `record ${req.params._id} successfully deleted`,
          _id: req.params._id
        })
      })  
    })
    //---------------------------------------------------------------
    //                    ROUTES FOR MESSAGE
    //---------------------------------------------------------------
 apiRouter
    .get('/messages', function(req, res){
      Message.find(req.query, function(err, results) {
        if(err) return res.json(err) 
        res.json(results)
      })
    })

  apiRouter
    .get('/messages/:_id', function(req, res){
      Message.findById(req.params._id, function(err, record){
        if(err || !record ) return res.json(err) 
        res.json(record)
      })
    })
  
  apiRouter
  .post('/messages', function(req, res){
    let newMessage = new Message(req.body)
    newMessage.save(function(err, record){
        if(err) return res.status(500).send('server/db error on attempt to save message to db')
        res.json(newMessage)
      })
  })
  

    //---------------------------------------------------------------
    //                    ROUTES FOR REPLIES
    //---------------------------------------------------------------
 apiRouter
    .get('/replies', function(req, res){
      Reply.find(req.query, function(err, results) {
        if(err) return res.json(err) 
        res.json(results)
      })
    })

  apiRouter
    .get('/replies/:_id', function(req, res){
      Reply.findById(req.params._id, function(err, record){
        if(err || !record ) return res.json(err) 
        res.json(record)
      })
    })
  
  apiRouter
  .post('/replies', function(req, res){
    let newReply = new Reply(req.body)
    newReply.save(function(err, record){
        if(err) return res.status(500).send('server/db error on attempt to save reply to db')
        res.json(newReply)
      })
  })
module.exports = apiRouter

//58c75d954233c96620f55bcd

//58c744611fe9496192bcc4e0