const Listing = require("../models/listing");

module.exports.isOwner = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing.owner.equals(req.session.userId)) {
    req.flash("error", "You are not allowed to do that");
    return res.redirect(`/listings/${req.params.id}`);
  }

  next();
};
