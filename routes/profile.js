const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { isLoggedIn } = require("../middleware/isLoggedIn");

const multer = require("multer");
const { storage } = require("../cloudConfig");
const upload = multer({ storage });
const Listing = require("../models/listing");

// ======================
// SHOW PROFILE
// ======================
router.get("/", isLoggedIn, async (req, res) => {
  const user = await User.findById(req.session.userId);
  res.render("users/profile/show", { user });
});

// ======================
// EDIT PROFILE FORM
// ======================
router.get("/edit", isLoggedIn, async (req, res) => {
  const user = await User.findById(req.session.userId);
  res.render("users/profile/edit", { user });
});

router.get("/listings", isLoggedIn, async (req, res) => {
  const listings = await Listing.find({ owner: req.session.userId });
  res.render("users/profile/listings", { listings });
});

// ======================
// UPDATE PROFILE
// ======================
router.put(
  "/",
  isLoggedIn,
  upload.single("avatar"),
  async (req, res) => {
    const { bio } = req.body;

    const user = await User.findById(req.session.userId);

    user.bio = bio;

    if (req.file) {
      user.avatar = {
        url: req.file.path,
        filename: req.file.filename
      };
    }

    await user.save();

    req.flash("success", "Profile updated successfully");
    res.redirect("/profile");
  }
);

module.exports = router;
