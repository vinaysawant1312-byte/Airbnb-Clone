const Favourites = require("../models/favourite");
const Home = require("../models/home");

exports.getIndex = (req, res, next) => {
  Home.fetchAll().then(([registeredHomes]) => {
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "AirBnB Home",
      currentPage: "Index",
    });
  });
};
exports.getHome = (req, res, next) => {
  Home.fetchAll().then(([registeredHomes]) => {
    res.render("store/home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Home List",
      currentPage: "Home",
    });
  });
};

exports.getBookings = (req, res, next) => {
  Home.fetchAll().then(([registeredHomes]) => {
    res.render("store/bookings", {
      registeredHomes: registeredHomes,
      pageTitle: "My Bookings",
      currentPage: "bookings",
    });
  });
};

exports.getFavouriteList = (req, res, next) => {
  Favourites.getFavourites((favourites) => {
    Home.fetchAll().then(([registeredHomes]) => {
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
  Home.findById(homeId).then(([homes]) => {
    const home = homes[0];
    res.render("store/home-detail", {
      pageTitle: "Home Detail",
      currentPage: "Home",
      home: home,
    });
  });
};

exports.postAddToFavourite = (req, res, next) => {
  Favourites.addToFavourite(req.body.id, (error) => {
    if (error) {
      console.log("Error while marking favourites", error);
    }
    res.redirect("/favourites");
  });
};

exports.postDeleteFavourite = (req, res, next) => {
  const homeId = req.params.homeId;

  Favourites.deleteById(homeId, (error) => {
    if (error) {
      console.log(error in deleting, error);
    }
    res.redirect("/favourites");
  });
};
