const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "pokemon",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      hp: { type: DataTypes.INTEGER, validate: { min: 1, max: 150 } },
      attack: { type: DataTypes.INTEGER, validate: { min: 1, max: 150 } },
      defense: { type: DataTypes.INTEGER, validate: { min: 1, max: 150 } },
      speed: { type: DataTypes.INTEGER, validate: { min: 1, max: 150 } },
      height: { type: DataTypes.INTEGER, validate: { min: 1, max: 500 } },
      weight: { type: DataTypes.INTEGER, validate: { min: 1, max: 500 } },
      image: {
        type: DataTypes.STRING,
        defaultValue:
          "https://vader.news/__export/1588965166057/sites/gadgets/img/2020/05/08/2-25193_pokemon-ball-transparent-background-transparent-background-pokeball-png.png_423682103.png",
        validate: { isUrl: true },
      },

      createdInDb: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    { timestamps: false }
  );
};
