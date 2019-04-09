module.exports = (sequelize, DataTypes) => {
  const LongTerms = sequelize.define("LongTerms", {
    title: DataTypes.STRING,
    completedBy: DataTypes.DATE,
    description: DataTypes.TEXT,
    category: DataTypes.STRING
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
