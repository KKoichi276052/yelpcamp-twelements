import express from "express";

const app = express();
const path = require("path");
const port = 3000;
const ejsMate = require("ejs-mate");
const mongoose = require("mongoose");
const catchAynsc = require("./utils/CatchAsync");
const Campground = require("./models/campground");
const methodOverride = require("method-override");
// const morgan = require("morgan");
// const { v4: uuid } = require("uuid");

// app.use(morgan("tiny"));

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(methodOverride("_method"));
// app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("public"));
app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "/views"));
app.set("views", path.join(__dirname, "/views"));
app.engine("ejs", ejsMate);
app.use(express.static("node_modules"));

mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp", {
  // these option are deprecated and always behave as if true
  // useNewUrlParser: true,
  // useCreateIndex: true,
  // useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("database connected");
});

app.get("/", (req, res) => {
  res.render("home");
});

app.get(
  "/campgrounds",
  catchAynsc(async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render("campgrounds/index", { campgrounds });
  })
);

app.get("/campgrounds/new", (req, res) => {
  res.render("campgrounds/new");
});

app.post(
  "/campgrounds",
  catchAsync(async (req, res) => {
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
  })
);

app.get(
  "/campgrounds/:id",
  catchAynsc(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render("campgrounds/show", { campground });
  })
);

app.get(
  "/campgrounds/:id/edit",
  catchAynsc(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render("campgrounds/edit", { campground });
  })
);

app.put(
  "/campgrounds/:id",
  catchAynsc(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, {
      ...req.body.campground,
    });
    console.log({ ...req.body });
    res.redirect(`/campgrounds/${campground._id}`);
  })
);

app.delete(
  "/campgrounds/:id",
  catchAynsc(async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect("/campgrounds");
  })
);

app.listen(3000, () => {
  console.log(`listening on port ${port}`);
});

function assignId(req, res, next) {
  req.id = uuid.v4();
  next();
}

app.use((err, req, res, next) => {
  res.send("something went wrong");
});
