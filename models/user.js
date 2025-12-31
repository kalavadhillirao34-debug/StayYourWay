const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  wishlist: [
    {
      type: Schema.Types.ObjectId,
      ref: "Listing"
    }
  ],

  avatar: {
    url: {
      type: String,
      default:
        "https://res.cloudinary.com/demo/image/upload/v1690000000/default-avatar.png"
    },
    filename: String
  },

  bio: {
    type: String,
    default: ""
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("User", userSchema);
