const fs = require("fs");
const rootDir = require("../utils/pathUtils");
const path = require("path");

const filePath = path.join(rootDir, "data", "homes.json");

module.exports = class Home {
  constructor(houseName, price, location, rating, photoUrl) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
  }

  save() {
    Home.fetchAll((registeredHomes) => {
      if (this.id) {
        registeredHomes = registeredHomes.map((home) =>
          this.id === home.id ? this : home,
        );
      } else {
        this.id = Math.random().toString();
        registeredHomes.push(this);
      }

      fs.writeFile(filePath, JSON.stringify(registeredHomes), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(callback) {
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
