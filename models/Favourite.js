const fs = require("fs");
const rootDir = require("../utils/pathUtils");
const path = require("path");

const favouriteFilePath = path.join(rootDir, "data", "Favourite.json");

module.exports = class Favourites {
  static addToFavourite(homeId, callback) {
    Favourites.getFavourites((favourites) => {
      if (favourites.includes(homeId)) {
        callback("Home is alrady marked favourite");
      } else {
        favourites.push(homeId);

        fs.writeFile(favouriteFilePath, JSON.stringify(favourites), callback);
      }
    });
  }

  static getFavourites(callback) {
    fs.readFile(favouriteFilePath, (err, data) => {
      callback(!err ? JSON.parse(data) : []);
    });
  }
};
