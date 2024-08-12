const fs = require("fs");
const path = require("path");
const router = require("express").Router();
const services = require("../services/dataSource.js");

// const data = require('../data/wines.json');
// const winesFilePath = path.join(__dirname, '../data/wines.json');
// const winesData = fs.readFileSync(winesFilePath, 'utf-8');
// const wineList = JSON.parse(winesData);

const productsController = {
  getAllProducts: (req, res) => {
    const wineList = services.load();
    res.render("products/products.ejs", { title: "Product Cart", wineList });
  },
  productCartAdd: (req, res) => {
    const { id } = req.params;
    const wine = services.findProductById(id);
    res.render("products/productCart.ejs", { title: "Product Cart", wine });
  },
  productCartView: (req, res) => {
    res.render("products/productCart.ejs", { title: "Product Cart" });
  },
  productDetail: (req, res) => {
    const { id } = req.params;
    
    const wine = services.findProductById(id);
    res.render("products/productDetail.ejs", {
      title: "Product Detail",
      wine: wine,
    });
  },
  productAddView: (req, res) => {
    res.render("products/productAdd.ejs", { title: "Alta producto" });
  },
  productAdd: (req, res) => {
    try {
      //si no viene imagen se carga una por defecto
      const image = req.file
        ? `./images/products/${req.file.filename}`
        : "/image/products/default.png";
      const { name, price, description, bodega, varietal, category, cantidad } =
        req.body;
      let products = services.load();
      const newProduct = {
        id: products.length + 1,
        nombre: name,
        descripcion: description,
        precio: price,
        bodega: bodega,
        categoria: category,
        varietal: varietal,
        cantidad: cantidad,
        imagen: image,
      };
      products.push(newProduct);
      services.save(products);
      res.redirect("/products");
    } catch (error) {
      console.log(error);
    }
  },
  productDel: (req, res) => {
    const { id } = req.params;
    let products = services.load();
    productToDelete = products.find((product) => product.id == id);
    // Obtener la ruta completa de la imagen
    const imagePath = path.join(
      __dirname,
      `../public/images/${productToDelete.imagen}`
    );
    // Eliminar la imagen físicamente
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error("Error al eliminar la imagen:", err);
      } else {
        console.log("Imagen eliminada con éxito");
      }
    });
    products = products.filter((product) => product.id !== id);
    services.save(products);
    // res.render("index.ejs", {
    //   title: "Bien-Heladas wines&drinks",
    //   wineList: products,
    // });
    res.redirect("/products");
  },
  //Editar Producto con ID
  productModView: (req, res) => {
    const { id } = req.params;

    // Asegúrate de que id es un número entero
    const wine = services.findProductById(id);

    if (!wine) {
      return res.status(404).send("Producto no encontrado");
    }

    res.render("products/productMod.ejs", {
      title: "Product Edit",
      wine: wine,
    });
  },

  productMod: (req, res) => {

    const { id } = req.params;
    const { name, price, description, bodega, varietal, category, cantidad } = req.body;

    // Buscamos el producto por ID
    let product = services.findProductById(id);
    
    // if (!product) {
    //   return res.status(404).send("Producto no encontrado");
    // }

    //si no viene imagen se carga una por defecto
    const image = req.file
      ? `../images/products/${req.file.filename}`
      : "../image/products/default.png";
      

    product = {
      id: id,
      nombre: name,
      descripcion: description,
      precio: price,
      bodega: bodega,
      categoria: category,
      varietal: varietal,
      cantidad: cantidad,
      imagen: image,
    };
    
    services.update(product);

    // res.redirect(`/products/productdetail/${numericId}`);
    res.redirect("/products");
  },
};

module.exports = productsController;

//controllers para products
