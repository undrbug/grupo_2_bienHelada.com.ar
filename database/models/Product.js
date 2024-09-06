module.exports = (sequelize, DataTypes) => {
const Products = sequelize.define('Products', {
  ID_Product: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  drink_description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  drink_type: {
    type: DataTypes.ENUM('Cerveza', 'Vino', 'Whisky', 'Espumante', 'Licor'),
    allowNull: false
  },
  Presentation: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  Stock: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  brand: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  Barcode: {
    type: DataTypes.STRING(20),
    allowNull: true,
    unique: true
  },
  Maturity: {
    type: DataTypes.DATE,
    allowNull: true
  },
  highlighted: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  offer: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  Image: {
    type: DataTypes.STRING(255),
    allowNull: true
  }
}, {
  tableName: 'Product',
  timestamps: false  
});
  
  return Products;
};

