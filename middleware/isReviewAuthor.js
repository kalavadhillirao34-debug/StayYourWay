const Review = require("../models/review");

module.exports.isReviewAuthor = async (req, res, next) => {
  const { reviewId } = req.params;
  const review = await Review.findById(reviewId);

  if (!review) {
    req.flash("error", "Review not found");
    return res.redirect("back");
  }

  if (!review.author.equals(req.session.userId)) {
    req.flash("error", "You do not have permission");
    return res.redirect("back");
  }

  next();
};
