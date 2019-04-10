module.exports = (sequelize, DataTypes) => {
  const LongTerms = sequelize.define("LongTerms", {
    title: DataTypes.STRING,
    category: DataTypes.STRING,
    completedBy: DataTypes.DATE,
    description: DataTypes.STRING,
    details: DataTypes.TEXT
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
