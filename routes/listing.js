const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn } = require("../middleware/isLoggedIn");
const { isOwner } = require("../middleware/isOwner");

const listingController = require("../controllers/listings");

// MULTER
const multer = require("multer");
const { storage } = require("../cloudConfig");
const upload = multer({ storage });

/* ======================
   ❤️ WISHLIST ROUTES
   MUST COME FIRST
====================== */

router.get(
  "/wishlist",
  isLoggedIn,
  wrapAsync(listingController.viewWishlist)
);

router.post(
  "/:id/wishlist",
  isLoggedIn,
  wrapAsync(listingController.toggleWishlist)
);

/* ======================
   INDEX
====================== */

router.get("/", wrapAsync(listingController.index));

/* ======================
   NEW
====================== */

router.get("/new", isLoggedIn, listingController.renderNewForm);

/* ======================
   CREATE
====================== */

router.post(
  "/",
  isLoggedIn,
  upload.single("listing[image]"),
  wrapAsync(listingController.createListing)
);

/* ======================
   SHOW
====================== */

router.get("/:id", wrapAsync(listingController.showListing));

/* ======================
   EDIT
====================== */

router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  upload.single("image"),
  wrapAsync(listingController.updateListing)
);

/* ======================
   DELETE
====================== */

router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.deleteListing)
);

module.exports = router;
