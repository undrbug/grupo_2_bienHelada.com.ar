const fs = require("fs");
const path = require("path");

const datasource = {
  filePath: path.resolve(__dirname, "../data/wines.json"),

  load() {
    const products =  fs.readFileSync(this.filePath, "");
    const productsJson = JSON.parse(products);
    return productsJson;
  },
  async save(data) {
    const jsonData = JSON.stringify(data);
    await fs.writeFile(this.filePath, jsonData, "utf-8");
  },
};

module.exports = datasource;