const fs = require("fs");
const path = require("path");
const router = require("express").Router();
const services = require("../services/dataSource.js");
const {validationResult} = require('express-validator');
const { log } = require("console");



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
    res.render("products/productAdd.ejs", { title: "Alta de producto" });
  },
  productAdd: (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("products/productAdd.ejs", {
        title: "Alta de producto",
        errors: errors.mapped(),
        oldData: req.body,
      });
    }
    try {
      //si no viene imagen se carga una por defecto
      const image = req.file
        ? `../images/products/${req.file.filename}`
        : "../images/products/default.jpg";
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
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Buscamos el producto por IDs
      let wine = services.findProductById(id);
      return res.render("products/productMod.ejs", {
        title: "Product Edit",
        errors: errors.mapped(),
        wine: wine,
        oldData: req.body,
      });
    }
    
    const { name, price, description, bodega, varietal, category, cantidad } = req.body;
    const image = req.file ? `../images/products/${req.file.filename}` : services.findProductById(id).imagen;
    // if (!product) {
    //   return res.status(404).send("Producto no encontrado");
    // }

    // let image = req.file ? `./images/products/${req.file.filename}` : existingImage;
    

    const updatedProduct = {
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
    
    // services.update(updatedProduct);

    // res.redirect(`/products/productdetail/${numericId}`);
    res.redirect("/products");
  },
};

module.exports = productsController;

//controllers para products
