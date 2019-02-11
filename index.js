// import your node modules

const db = require('./data/db.js');
const express = require('express');
const server = express();

// add your server code starting here
server.use(express.json());
server.get('/',(req, res)=>{
  res.send('Hello from Express!');
})
server.get('/favicon.ico', (req,res)=>{
  res.status(204)
})
server.get('/api/posts', (req,res)=>{
  const users = db.find().then(users=>{res.send(users)}).catch(err=>res.send(err));
})
server.get('/api/posts/:userId',(req,res)=>{
  const id = req.params.userId;

  db.findById(id).then(user=>{
    if(user[0].id==id) {
      res.status(200).json(user)
    }else{
      res.status(404).json({message: 'user not found'})
    }

  }).catch(err=>{res.status(500).json({message: 'The post information could not be retrieved.'})})
});
server.post('/api/posts', (req,res)=>{
  const userInfo = req.body
  db.insert(userInfo)
    .then(result=>{
      res.status(201).json(result)
    })
    .catch(err=>res.status(500).json({error: err}))
});
server.put('/api/posts/:userId', (req,res)=>{
  const id = req.params.userId;
  if(!req.body.title || !req.body.contents){
    res.status(400).json({errorMessage: "Please provide contents and title for post"})
  }
  db.findById(id)
    .then(result=>{
      if(result){
      db.update(id, req.body)
        .then(result=>{
          res.status(200).json(result)
        })
        .catch(err =>{
          res.status(400).json({message: "The post with the specified ID does not exist." })
        })}
    })
    .catch(err=>res.status(500).json({error:err}))

});
server.delete('/api/posts/:userId', (req,res)=>{
  const id = req.params.userId;
  db.findById(id).then(user=>{
    if(user){
      db.remove(id).then(user =>{
        res.status(200).json(user);
      })
    }else{
      res.status(404).json({message: 'the user does not exist'});
    }
  }
).catch(err=>res.status(500).json({error:err}));
});
server.listen(3000,()=>{
  console.log('Server running on http://localhost:3000');
});
