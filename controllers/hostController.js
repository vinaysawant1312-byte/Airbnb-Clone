const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  res.render("host/addhome", {
    pageTitle: "Add Home to airbnb",
    currentPage: "addHome",
  });
};

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";
  res.render("host/edit-home", {
    pageTitle: "Edit Your Home",
    currentPage: "hostHome",
    editing: editing,
  });
};

exports.getHostHome = (req, res, next) => {
  const registeredHomes = Home.fetchAll((homes) => {
    res.render("host/host-home-list", {
      registeredHomes: homes,
      pageTitle: "Host Home List",
      currentPage: "hostHome",
    });
  });
};

exports.postAddHome = (req, res, next) => {
  const { houseName, price, location, rating, photoUrl } = req.body;
  const home = new Home(houseName, price, location, rating, photoUrl);
  home.save();
  res.render("host/homeAdded", {
    pageTitle: "Home Added Successfuly",
    currentPage: "homeAdded",
  });
};
