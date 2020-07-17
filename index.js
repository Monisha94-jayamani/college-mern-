const express = require("express");
const app = express();
const boyParser = require("body-parser");
const port = process.env.PORT || 5000;
const cors = require("cors");
app.use(cors());
app.use(boyParser.json());
const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
//const dbUrl = "mongodb://127.0.0.1:27017/";
//password:4QJnwN3i7wN0jWGB
//url:mongodb+srv://monisha:4QJnwN3i7wN0jWGB@cluster0.a3jmi.mongodb.net/student?retryWrites=true&w=majority
const dbUrl =
  "mongodb+srv://monisha:4QJnwN3i7wN0jWGB@cluster0.a3jmi.mongodb.net/student?retryWrites=true&w=majority";
const ObjectID = mongodb.ObjectID;
app.get("/staff", (req, res) => {
  mongoClient.connect(dbUrl, (err, client) => {
    if (err) throw err;
    client
      .db("student")
      .collection("staffdetails")
      .find()
      .toArray()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => res.json({ message: "no data found", error: err }));
  });
});
app.post("/staff", (req, res) => {
  mongoClient.connect(dbUrl, (err, client) => {
    if (err) throw err;
    client
      .db("student")
      .collection("staffdetails")
      .insertOne(req.body, (err, data) => {
        if (err) throw err;
        client.close();
        console.log("staff created");
        res.json({ message: "staff details created" });
      });
  });
});
app.get("/student", (req, res) => {
  console.log("get");
  mongoClient.connect(dbUrl, (err, client) => {
    client
      .db("student")
      .collection("studentdetails")
      .find()
      .toArray()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => res.json({ message: "no data found", error: err }));
  });
});
app.post("/student", (req, res) => {
  mongoClient.connect(dbUrl, (err, client) => {
    client
      .db("student")
      .collection("studentdetails")
      .insertOne(req.body, (err, data) => {
        if (err) throw err;
        client.close();
        console.log("user created successfully");
        res.status(200).json({ message: "collection is created" });
      });
  });
});
app.put("/studentupdate", (req, res) => {
  mongoClient.connect(dbUrl, (err, client) => {
    client
      .db("student")
      .collection("studentdetails")
      .findOneAndUpdate({ id: req.body.id }, { $set: req.body })
      .then((data) => {
        console.log("student data updated successfully", data);
        client.close();
        res.json({ message: "student updated" });
      });
  });
});

app.delete("/studentdelete", (req, res) => {
  console.log("delete", req.body);
  mongoClient.connect(dbUrl, (err, client) => {
    if (err) throw err;
    client
      .db("student")
      .collection("studentdetails")
      .deleteOne({ id: req.body.id }, (err, data) => {
        if (err) throw err;
        client.close();
        res.json({ message: "data deleted" });
      });
  });
});
app.listen(port, () => {
  console.log(`server is listening ${port}`);
});
