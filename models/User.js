const mongoose = require('mongoose');
const myschemea = new mongoose.Schema({
      username: {
            type: String,
      },
      email: {
            type: String,
      },
      password: {
            type: String,
      },
      userprofile: {
            type: String,
      },
      gender: {
            type: String,
      },
      lastDonation: {
            type: Number,
      },
      totalDonation: {
            type: Number,
      },
      dob: {
            type: Number,
      },
      phone: {
            type: Number,
      },
      bloodGroup: {
            type: String,
      }
},
      { timestamps: true }
)

const mymodel = mongoose.model("Peoples", myschemea);
module.exports = mymodel;  