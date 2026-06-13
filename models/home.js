const fs = require("fs");
const rootDir = require("../utils/pathUtils");
const path = require("path");

module.exports = class Home {
  constructor(houseName, price, location, rating, photoUrl) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
  }

  save() {
    this.id = Math.random().toString();
    Home.fetchAll((registeredHomes) => {
      registeredHomes.push(this);
      const filePath = path.join(rootDir, "data", ",homes.json");
      fs.writeFile(filePath, JSON.stringify(registeredHomes), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(callback) {
    const filePath = path.join(rootDir, "data", ",homes.json");
    fs.readFile(filePath, (err, data) => {
      callback(!err ? JSON.parse(data) : []);
    });
  }

  static findById(homeId, callback) {
    Home.fetchAll((homes) => {
      const homeFound = homes.find((h) => h.id === homeId);
      callback(homeFound);
    });
  }
};
