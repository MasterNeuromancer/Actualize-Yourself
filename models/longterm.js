module.exports = (sequelize, DataTypes) => {
  const LongTerms = sequelize.define("LongTerms", {
    nodeId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: DataTypes.STRING,
    date: DataTypes.DATE,
    percent: DataTypes.INTEGER,
    description: DataTypes.STRING,
    details: DataTypes.TEXT,
    finished: { type: DataTypes.BOOLEAN, defaultValue: false }
  });

  LongTerms.associate = function (models) {
    models.LongTerms.belongsTo(models.Users, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };
  return LongTerms;
};
