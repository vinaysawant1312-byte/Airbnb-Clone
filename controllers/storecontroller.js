const Favourites = require("../models/favourite");
const Home = require("../models/home");

exports.getIndex = (req, res, next) => {
  const registeredHomes = Home.fetchAll((homes) => {
    res.render("store/index", {
      registeredHomes: homes,
      pageTitle: "AirBnB Home",
      currentPage: "Index",
    });
  });
};
exports.getHome = (req, res, next) => {
  const registeredHomes = Home.fetchAll((homes) => {
    res.render("store/home-list", {
      registeredHomes: homes,
      pageTitle: "Home List",
      currentPage: "Home",
    });
  });
};

exports.getBookings = (req, res, next) => {
  const registeredHomes = Home.fetchAll((homes) => {
    res.render("store/bookings", {
      registeredHomes: homes,
      pageTitle: "My Bookings",
      currentPage: "bookings",
    });
  });
};

exports.getFavouraiteList = (req, res, next) => {
  Favourites.getFavourites((favourites) => {
    Home.fetchAll((registeredHomes) => {
      const favouriteHomes = registeredHomes.filter((home) => {
        return favourites.includes(home.id);
      });
      console.log("hiii", favouriteHomes);
      res.render("store/favourite-list", {
        favouriteHomes: favouriteHomes,
        pageTitle: "My Favourites",
        currentPage: "favouraite",
      });
    });
  });
};

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log("at home detail page", homeId);
  Home.findById(homeId, (home) => {
    console.log("home Found", home);
    res.render("store/home-detail", {
      pageTitle: "Home Detail",
      currentPage: "Home",
      home: home,
    });
  });
};

exports.postAddToFavoraite = (req, res, next) => {
  console.log("come to the", req.body);
  Favourites.addToFavourite(req.body.id, (error) => {
    if (error) {
      console.log("Error while marking favourites", error);
    }
    res.redirect("/favourites");
  });
};
