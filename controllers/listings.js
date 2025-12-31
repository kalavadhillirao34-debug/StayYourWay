

const Listing = require("../models/listing");
const ExpressError = require("../utils/ExpressError");
const axios = require("axios");
// const Wishlist = require("../models/wishlist");
// // ======================
// // NEW FORM
// // ======================
module.exports.renderNewForm = (req, res) => {
  res.render("listings/new");
};


const User = require("../models/user");

module.exports.index = async (req, res) => {
  const { category, minPrice, maxPrice, search } = req.query;

  let filter = {};

  if (category) filter.category = category;

  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  if (search) {
    filter.$or = [
      { title: new RegExp(search, "i") },
      { location: new RegExp(search, "i") },
      { country: new RegExp(search, "i") }
    ];
  }

  const allListings = await Listing.find(filter);

  let wishlistIds = [];

  if (req.session.userId) {
    const user = await User.findById(req.session.userId);
    if (user) {
      wishlistIds = user.wishlist.map(id => id.toString());
    }
  }

  res.render("listings/index", {
    allListings,
    category,
    minPrice,
    maxPrice,
    search,
    wishlistIds
  });
};


module.exports.createListing = async (req, res) => {
  const { location, country } = req.body.listing;

  // 🌍 GEOCODING
  const geoResponse = await axios.get(
    "https://nominatim.openstreetmap.org/search",
    {
      params: {
        q: `${location}, ${country}`,
        format: "json",
        limit: 1
      }
    }
  );

  if (!geoResponse.data.length) {
    req.flash("error", "Invalid location");
    return res.redirect("/listings/new");
  }

  const { lat, lon } = geoResponse.data[0];

  const listing = new Listing(req.body.listing);

  listing.geometry = {
    type: "Point",
    coordinates: [lon, lat]
  };

  listing.owner = req.session.userId;

  if (req.file) {
    listing.image = {
      url: req.file.path,
      filename: req.file.filename
    };
  }

  await listing.save();

  req.flash("success", "New listing created!");
  res.redirect(`/listings/${listing._id}`);
};



// ======================
// SHOW
// ======================
module.exports.showListing = async (req, res) => {
  const listing = await Listing.findById(req.params.id)
    .populate("owner")
    .populate({
      path: "reviews",
      populate: { path: "author" }
    });

  if (!listing) {
    throw new ExpressError(404, "Listing not found");
  }

  res.render("listings/show", { listing });
};

// ======================
// EDIT FORM
// ======================
module.exports.renderEditForm = async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  res.render("listings/edit", { listing });
};





module.exports.updateListing = async (req, res) => {
  const listing = await Listing.findByIdAndUpdate(
    req.params.id,
    req.body.listing,
    { new: true }
  );

  // 🔥 If new image uploaded
  if (req.file) {
    listing.image = {
      url: req.file.path,
      filename: req.file.filename
    };
    await listing.save();
  }

  req.flash("success", "Listing updated!");
  res.redirect(`/listings/${listing._id}`);
};



// ======================
// DELETE
// ======================
module.exports.deleteListing = async (req, res) => {
  await Listing.findByIdAndDelete(req.params.id);
  req.flash("success", "Listing deleted!");
  res.redirect("/listings");
};



module.exports.toggleWishlist = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(req.session.userId);

  const index = user.wishlist.indexOf(id);

  if (index === -1) {
    user.wishlist.push(id);
  } else {
    user.wishlist.splice(index, 1);
  }

  await user.save();
  res.redirect("/listings");
};


module.exports.viewWishlist = async (req, res) => {
  const user = await User.findById(req.session.userId)
    .populate("wishlist");

  res.render("wishlist/index", {
    listings: user.wishlist
  });
};


