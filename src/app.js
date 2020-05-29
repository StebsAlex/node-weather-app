const path = require("path");
const express = require("express");
const app = express();
const hbs = require("hbs");
const geoCode = require("./utils/geocode");
const foreCast = require("./utils/forecast");

//Define paths
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
console.log(partialsPath);
//setup hbs engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
//setup static directory to serve
app.use(express.static(publicPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Stebin Alex",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide a search term",
    });
  } else if (req.query.address.length < 4) {
    return res.send({
      error: "Please enter more than 4 chars",
    });
  }
  console.log(req.query.address);
  const address = req.query.address;
  geoCode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }
    // const { latitude, longitude, location } = geoData;
    console.log(latitude, longitude, location);
    foreCast(latitude, longitude, (error, foreCastData) => {
      if (error) {
        return res.send({ error });
      }
      console.log(foreCastData);
      res.send({
        forecast: foreCastData,
        location,
        address: req.query.address,
      });
    });
  });
});

//
app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req.query);
  res.send({
    products: [],
  });
});

app.listen(3000, () => {
  console.log("Server started at port 3000");
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About page",
    name: "Stebin Alex",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help page",
    helpText: "Blah blag blagggggghhhhh",
    name: "Stebin Alex",
  });
});
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 error",
    name: "Stebin Alex",
    errorMessage: "Help article not found ",
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    title: "404 Error",
    name: "Stebin Alex",
    errorMessage: "my 404 page ",
  });
});
