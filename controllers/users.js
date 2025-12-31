
const User = require("../models/user");
const { hashPassword, verifyPassword } = require("../utils/auth");

// ======================
// RENDER FORMS
// ======================
module.exports.renderSignupForm = (req, res) => {
  res.render("users/signup");
};

module.exports.renderLoginForm = (req, res) => {
  res.render("users/login");
};

// ======================
// SIGNUP LOGIC
// ======================
module.exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const hashedPassword = await hashPassword(password);

    const user = new User({
      username,
      email,
      password: hashedPassword
    });

    await user.save();

    // ✅ AUTO LOGIN
    req.session.userId = user._id;

    req.flash("success", "Login to use Stay Your Way");
    res.redirect("/login");
  } catch (e) {
    req.flash("error", "Username or email already exists");
    res.redirect("/signup");
  }
};

// ======================
// LOGIN LOGIC
// ======================
module.exports.login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    req.flash("error", "Invalid username or password");
    return res.redirect("/login");
  }

  const isValid = await verifyPassword(password, user.password);
  if (!isValid) {
    req.flash("error", "Invalid username or password");
    return res.redirect("/login");
  }

  req.session.userId = user._id;

  req.flash("success", "Welcome back!");
  res.redirect("/listings");
};

// ======================
// LOGOUT
// ======================
module.exports.logout = (req, res) => {
  req.flash("success", "Logged out successfully");

  req.session.destroy(err => {
    if (err) {
      console.error(err);
      return res.redirect("/listings");
    }

    res.clearCookie("connect.sid");
    res.redirect("/login");
  });
};
