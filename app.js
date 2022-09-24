const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config({ path: ".env" });

const myuser = require("./models/User");

const mongoose = require('mongoose');
mongoose.connect(
      process.env.MONGO_URL,
      {
            useNewUrlParser: true, useUnifiedTopology: true
      },
      () => {
            console.log("connected to data base");
      }
)

app.use(express.json({ limit: '50mb' }));
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))


const path = require('path');
const { db } = require('./models/User');
app.use(express.static(path.join(__dirname, 'static')));
var x = path.join(__dirname) + "/views";


app.get('/', (req, res) => {
      res.sendFile(x + "/home.html");
})
app.get('/login', (req, res) => {
      res.sendFile(x + "/login.html");
})
app.get('/post', (req, res) => {
      res.sendFile(x + "/post.html");
})
app.get('/allusers', async (req, res) => {
      res.sendFile(x + "/allusers.html");
});
app.get('/update', async (req, res) => {
      res.sendFile(x + "/update.html");
});
app.get('/donate', async (req, res) => {
      res.sendFile(x + "/donate.html");
});
app.get('/user/:id', async (req, res) => {
      const allusers = await myuser.findById(req.params.id);
      // console.log(allusers);
      res.send(allusers);
});

app.get('/allids', async (req, res) => {
      var myids = await myuser.aggregate([
            { $group: { _id: null, ids: { $addToSet: "$_id" } } }
      ]).exec()
      // console.log(myids[0].ids);
      res.send(myids[0].ids);
})

//req to save and take data from database
app.post('/saveUser', async (req, res) => {
      console.log(req.body.email);
      console.log(req.body.password);
      const newuser = new myuser({
            username: req.body.name,
            email: req.body.email,
            password: req.body.password,
            userprofile: req.body.myimg,
            gender: req.body.gender,
            lastDonation: (new Date() - 1),
            totalDonation: 0,
            dob: new Date(),
            phone: 7027513016,
            bloodGroup:"A+"
      });
      const user = await newuser.save();
      res.send(user);
})

app.post('/updatedata/:id', async (req, res) => {
      
      console.log(req.params.id);
      // console.log(req.body.password);
      // console.log(req.body.password);
      console.log("here");
      await myuser.findByIdAndUpdate(req.params.id, {
            username: req.body.name,
            email: req.body.email,
            gender: req.body.gender
      })
    
      res.send("updated");
})

app.post('/donatedata/:id', async (req, res) => {
      console.log(req.params.id);
      console.log("here");
      await myuser.findByIdAndUpdate(req.params.id,{
            gender: req.body.gender,
            lastDonation: req.body.lastDonation,
            totalDonation: req.body.totalDonation,
            dob: req.body.dob,
            phone: req.body.phone,
            bloodGroup: req.body.bloodGroup
      })

      res.send("Donated");
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
      console.log(`listning at ${PORT}`);
})