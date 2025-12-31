const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true
  },

  description: String,
  image: {
    url: String,
    filename: String
  },

  price: Number,
  location: String,
  country: String,

  category: {
    type: String,
    enum: [
      "beach",
      "mountain",
      "city",
      "cabin",
      "camping",
      "luxury",
      "island",
      "ski",
      "desert",
      "lake",
      "forest",
      "historic",
    ],
    default: "city",
  },

  geometry: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point"
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },


  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review"
    }
  ]
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing && listing.reviews.length) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});




module.exports = mongoose.model("Listing", listingSchema);
