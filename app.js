// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// const path = require("path");
// const methodOverride = require("method-override");
// const ejsMate = require("ejs-mate");
// const ExpressError = require("./utils/ExpressError.js");
// const session = require("express-session");
// const flash = require("connect-flash");
// const passport = require("passport");
// const LocalStrategy = require("passport-local");
// const User = require("./models/user.js");


// const MONGOURL = "mongodb://127.0.0.1:27017/stay";
// const listingsRouter = require("./routes/listing.js");
// const userRouter = require("./routes/user.js");
// const reviewRouter = require("./routes/review.js");

// const reviews = require("./routes/review.js");
// main()
//   .then(() => console.log("connected to DB"))
//   .catch((err) => console.log("error connecting to DB:", err));

// async function main() {
//   await mongoose.connect(MONGOURL);
// }

// // IMPORTANT: Register engine BEFORE view engine
// app.engine("ejs", ejsMate);
// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));

// app.use(express.urlencoded({ extended: true }));
// app.use(methodOverride("_method"));
// app.use(express.static(path.join(__dirname, "/public")));

// const sessionOptions = {
//   secret: "mysupersecretcode",
//   resave: false,
//   saveUninitialized: true,
//   cookie: {
//     expires: Date.now()+ 7*24*60*60*1000,
//     maxAge: 7*24*60*60*1000,
//     httpOnly: true,
//   },
// };

// // Root
// app.get("/", (req, res) => {
//   res.send("hi i am root");
// });

// app.use(session(sessionOptions));
// app.use(flash());

// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// app.use((req, res, next) =>{
//   res.locals.success = req.flash("success");
//   res.locals.error = req.flash("error");
//   next();
// })


// app.use("/listings", listingsRouter);
// app.use("/listings/:id/reviews", reviewRouter);
// app.use("/", userRouter);

// app.use((req, res, next) => {
//   next(new ExpressError(404, "Page Not Found!"));
// });

// app.use((err, req, res, next) => {
//   const { statusCode = 500, message = "Something went wrong" } = err;
//   // res.status(statusCode).send(message);
//   res.status(statusCode).render("earror.ejs", {message})
// });

// app.listen(8080, () => {
//   console.log("server is listening on port 8080");
// });
if(process.env.NODE_ENV != "production"){
  require('dotenv').config();
}
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const MongoStore = require('connect-mongo').default;
const flash = require("connect-flash");

const ExpressError = require("./utils/ExpressError");
const User = require("./models/user");

// Routes
const listingRoutes = require("./routes/listing");
const reviewRoutes = require("./routes/review");
const userRoutes = require("./routes/user");

// ======================
// DATABASE
// ======================
const dbUrl = process.env.ATLASDB_URL;

mongoose
  .connect(dbUrl)
  .then(() => console.log("connected to DB"))
  .catch(err => console.log(err));

// ======================
// VIEW ENGINE
// ======================
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ======================
// MIDDLEWARES
// ======================
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// ======================
// SESSION CONFIG
// ======================
const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});
store.on("error", () =>{
  console.log("EARROR IN THE MONGO SESSION STORE", err);
})
const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    maxAge: 7 * 24 * 60 * 60 * 1000
  }
};



app.use(session(sessionOptions));
app.use(flash());

// ======================
// GLOBAL USER & FLASH
// ======================
app.use(async (req, res, next) => {
  if (req.session.userId) {
    res.locals.currentUser = await User.findById(req.session.userId);
  } else {
    res.locals.currentUser = null;
  }

  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

// ======================
// ROUTES
// ======================
app.use("/listings", listingRoutes);
app.use("/listings/:id/reviews", reviewRoutes);
app.use("/", userRoutes);
const profileRoutes = require("./routes/profile");
app.use("/profile", profileRoutes);
// const wishlistRoutes = require("./routes/wishlist");
// app.use("/wishlist", wishlistRoutes);


// ======================
// 404 HANDLER
// ======================
app.use((req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

// ======================
// ERROR HANDLER
// ======================
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("earror.ejs", { message });
});

// ======================
// SERVER
// ======================
app.listen(8080, () => {
  console.log("server running on port 8080");
});
