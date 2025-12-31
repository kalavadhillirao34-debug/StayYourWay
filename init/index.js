const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGOURL = "mongodb://127.0.0.1:27017/stay";

async function main() {
  await mongoose.connect(MONGOURL);
  console.log("connected to db");
}

main().catch(err => console.log(err));

const initDb = async () => {
  await Listing.deleteMany({});
  console.log("Previous data deleted ✅");

  const ownerId = "69142f9936c49e745fda6d55"; // existing user

  const listingsWithOwner = initData.data.map(listing => ({
    ...listing,
    owner: ownerId
    // ✅ DO NOT TOUCH image
  }));

  await Listing.insertMany(listingsWithOwner);
  console.log("Data was initialized successfully ✅");
};

initDb();
