const express = require("express");
const hbs = require("hbs");
const app = express();
const path = require("path");
const request = require("request");
const bodyParser = require("body-parser");

const geoCode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");
const port = process.env.PORT || 3000;

const staticPath = path.join(__dirname, "../public");
const tempPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(staticPath));
app.set("view engine", "hbs");
app.set("views", tempPath);
hbs.registerPartials(partialsPath);

// const API_KEY = "02267bd259161c86149f729ef7167184";
app.post("/", (req, res) => {
  const address = req.body.address;
  console.log(address);


    if (!address) {
      return res.render({
        error: "you must provide an address!",
      });
    }

  geoCode(address, (err, { lattitude, longitude, location } = {}) => {
    if (err) {
      return res.send({ error: err });
    }
    forecast(lattitude, longitude, (err, weatherData) => {
      if (err) {
        res.render("index.hbs", {
        title: "weather",
        name: "gaurav",
        forecast: 'please enter valid location ',
        location: location,
      });
      }
      // res.send({
      //   forecast: weatherData,
      //   location,
      // });
      // const showData = {
      //   title: "weather",
      //   name: "gaurav",
      //   forecast: weatherData,
      //   location: location
      // }

      res.render("index.hbs", {
        title: "weather",
        name: "gaurav",
        forecast: weatherData,
        location: location,
      });
    });
  });
});

app.get("/", (req, res) => {
  res.render("index.hbs", {
    title: "weather",
    name: "gaurav",
  });
});
app.get("/help", (req, res) => {
  res.render("help.hbs", {
    title: "Help",
    name: "gaurav",
  });
});
app.get("/about", (req, res) => {
  res.render("about.hbs", {
    title: "About",
    name: "gaurav",
  });
});
app.get("*", (req, res) => {
  res.render("404.hbs", {
    title: "404",
    name: "gaurav",
    message: "This page is not exist.",
  });
});

app.listen(port, () => {
  console.log("server is running at port 3000");
});
