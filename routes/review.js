const express = require("express");
const router = express.Router({ mergeParams: true });

const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const { reviewSchema } = require("../schema");

const Review = require("../models/review");
const Listing = require("../models/listing");

// 🔐 AUTH MIDDLEWARES
const { isLoggedIn } = require("../middleware/isLoggedIn");
const { isReviewAuthor } = require("../middleware/isReviewAuthor");

const reviewController = require("../controllers/reviews");
// ======================
// VALIDATE REVIEW
// ======================
const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const errMsg = error.details.map(el => el.message).join(",");
    throw new ExpressError(400, errMsg);
  }
  next();
};

// ======================
// CREATE REVIEW
// ======================
router.post(
  "/",
  isLoggedIn,           // 🔐 must be logged in
  validateReview,
  wrapAsync(reviewController.createReview)
);

// ======================
// DELETE REVIEW (AUTHOR ONLY)
// ======================
router.delete(
  "/:reviewId",
  isLoggedIn,           // 🔐 must be logged in
  isReviewAuthor,       // 🔐 must be review author
  wrapAsync(reviewController.destroyReview)
);

module.exports = router;
