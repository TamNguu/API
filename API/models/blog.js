const mongoose = require("mongoose");
// Declare the Schema of the Mongo model
var blogSchema = new mongoose.userSchema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  numberViews: {
    type: Number,
    default: 0,
  },
  isLiked: {
    type: Boolean,
    default: false,
  },
  isLiked: {},
});

//Export the model
module.exports = mongoose.model("Blog", userSchema);
