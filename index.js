
const express = require("express");
const server = express();
const db = require("./data/db.js");

// add your server code starting here
server.use(express.json());

server.get("/posts", (req, res) => {
  db.find()
    .then(results => res.status(200).send(results))
    .catch(err =>
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved" })
    );
});

server.get("/posts/:id", (req, res) => {
  db.findById(req.params.id)
    .then(result => {
      if (result.length == 0) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
      res.status(200).json(result);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The post information could not be retrieved!" });
    });
});
server.post("/posts", (req, res) => {
  if (!req.body.title || !req.body.contents) {
    req.statusCode(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  }
  db.insert(req.body)
    .then(result => {
      res.status(201).json(result);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.delete("/posts/:id", (req, res) => {
  db.remove(req.params.id)
    .then(result => {})
    .catch(err => {});
});

server.put("/posts/:id", (req, res) => {
  if (!req.body.title || !req.body.contents) {
    res.status(400).json({ message: "Please provide a title and contents" });
  }
  db.update(req.params.id, req.body)
    .then(result => {
      if (!result) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else {
        res.status(200).json(result);
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "The post information could not be modified." });
    });
});
server.listen(3000, () => {
  console.log("server alive on 3000");
>>>>>>> master
});
