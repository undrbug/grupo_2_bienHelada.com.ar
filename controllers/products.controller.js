const fs = require("fs");
const path = require("path");
const router = require("express").Router();
const services = require("../services/dataSource.js");
const { validationResult } = require("express-validator");
let db = require("../database/models");

const productsController = {
	getAllProducts: (req, res) => {
		db.Product.findAll()
			.then(function (wineList) {
				res.render("products/products.ejs", {
					title: "Product Cart",
					wineList: wineList,
				});
			})
			.catch( (error) => {
				console.error("Error al obtener productos:", error.message);
				res.status(500).send("Error al obtener la lista de productos.");
			});
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
		db.Product.findByPk(id, {
			include: { association: "drinktype" } // Incluye la asociación definida en el modelo
		})
		.then((wine) => {
			res.render("products/productDetail.ejs", {
				title: "Product Detail",
				wine: wine // Enviar el objeto completo a la vista
			});
		})
		.catch((error) => {
			console.error("Error al obtener productos:", error.message);
			res.status(500).send("Error al obtener la lista de productos.");
		});
	},
	productAddView: (req, res) => {
		db.Drinktype.findAll()
			.then(function(drinkTypes) { 
				return res.render("products/productAdd.ejs", {
					title: "Alta de producto",
					drinkTypes: drinkTypes,
				});
			})
			.catch(function(error) {
				console.log(error);
				res.status(500).send('Error al cargar los tipos de bebida');
			});
	},
	productAdd: (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			db.Drinktype.findAll()
				.then(function(drinkTypes) {
					return res.drinkTypes 
					});
				}
	
					const image = req.file
		? `../images/products/${req.file.filename}`
		: "../images/products/default.jpg";
				

		db.Product.create({
			name: req.body.name,
			drink_description: req.body.drink_description,
			drink_type: req.body.drink_type,
			price: req.body.price,
			Stock: req.body.Stock,
			brand: req.body.brand,
			Barcode: req.body.Barcode,
			Presentation: req.body.presentation,
			Image: image,
		})
		.then(() => {
			res.redirect("/"); // Redirige a la página principal o donde desees
		})
		.catch(error => {
			console.log(error);
			res.status(500).send('Error al crear el producto');
		});
	},
	productDel: async (req, res) => {
		try {
			// Busca y elimina el producto por ID
			const result = await db.Product.destroy({
				where: { ID_Product: req.params.id }
			});
	
			// Verifica si se eliminó algún producto
			if (result === 0) {
				return res.status(404).send("Producto no encontrado");
			}
	
			// Redirige a la lista de productos
			res.redirect("/products");
		} catch (error) {
			console.error("Error al eliminar el producto:", error);
			res.status(500).send("Error interno del servidor");
		}
	},
	//Editar Producto con ID
	productModView: (req, res) => {

		let bebidas = db.Product.findByPk(req.params.id);
		let tipoBebidas = db.Drinktype.findAll();
		Promise.all([bebidas, tipoBebidas])
		.then(function([producto,tipo]){
			res.render("products/productMod.ejs", {
				title: "Product Edit",
				producto: producto,
				tipo:tipo
			});

		})

		
	},

	productMod: (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			db.Drinktype.findAll()
				.then(function(drinkTypes) {
					return res.drinkTypes 
					});
				}
	
					const image = req.file
		? `../images/products/${req.file.filename}`
		: "../images/products/default.jpg";
				

		db.Product.update({
			name: req.body.name,
			drink_description: req.body.drink_description,
			drink_type: req.body.drink_type,
			price: req.body.price,
			Stock: req.body.Stock,
			brand: req.body.brand,
			Barcode: req.body.Barcode,
			Presentation: req.body.presentation,
			Image: image,
		}, {
			where:{

				ID_Product:req.params.id
			}
		})
		.then(() => {
			res.redirect("/products")
			 
		})
		.catch(error => {
			console.log(error);
			res.status(500).send('Error al crear el producto');
		});
	},
	//obtner los valores en formato json de la tabla DrinkType (sin vista)
  //para completar el select de la vista de alta de productos
	drinkList: (req, res) => {
		db.Drinktype.findAll()
			.then((drinkList) => {
				res.send(drinkList);
			})
			.catch((error) => {
				// Manejo de errores
				console.error("Error al obtener productos:", error);
				res.status(500).send("Error al obtener la lista de productos.");
			});
	},
	//busca productos desde el input de busqueda del navbar
	searchProducts: (req, res) => {
		const { search } = req.params;
		db.Product.findAll({
			where: {
        //buscar por todos los campos de la tabla productos
        [db.Sequelize.Op.or]: [
          { name: { [db.Sequelize.Op.like]: `%${search}%` } },
          { drink_description: { [db.Sequelize.Op.like]: `%${search}%` } },
          { drink_type: { [db.Sequelize.Op.like]: `%${search}%` } },
          { Presentation: { [db.Sequelize.Op.like]: `%${search}%` } },
          { price: { [db.Sequelize.Op.like]: `%${search}%` } },
          { brand: { [db.Sequelize.Op.like]: `%${search}%` } },
        ],
			},
		})
			.then((wineList) => {
				res.render("products/products.ejs", {
					title: "Product List",
					wineList: wineList,
				});
			})
			.catch(function (error) {
				console.error("Error al obtener productos:", error.message);
				res.status(500).send("Error al obtener la lista de productos.");
			});
	},
};

module.exports = productsController;