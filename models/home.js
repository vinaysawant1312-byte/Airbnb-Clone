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
      if (err) {
        callback([]);
        return;
      }
      try {
        const parsed = JSON.parse(data);
        callback(Array.isArray(parsed) ? parsed : [parsed]);
      } catch (e) {
        callback([]);
      }
    });
  }

  static findById(homeId, callback) {
    Home.fetchAll((homes) => {
      const homeFound = homes.find((h) => h.id === homeId);
      callback(homeFound);
    });
  }

  static deleteById(homeId, callback) {
    Home.fetchAll((homes) => {
      const updated = homes.filter((h) => h.id !== homeId);
      fs.writeFile(filePath, JSON.stringify(updated), callback);
    });
  }
};
