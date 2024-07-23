const fs = require("fs");
const path = require("path");

const datasource = {
  filePath: path.resolve(__dirname, '../data/wines.json'),

  load() {
    const products =  fs.readFileSync(this.filePath, "utf-8");
    const productsJson = JSON.parse(products);
    return productsJson;
  },
  save(data) {
    const jsonData = JSON.stringify(data);
    fs.writeFileSync(this.filePath, jsonData, "utf-8");
  },
};

module.exports = datasource;