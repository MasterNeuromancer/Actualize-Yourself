module.exports = (sequelize, DataTypes) => {
  const LongTerm = sequelize.define("LongTerm", {
    title: DataTypes.STRING,
    completedBy: DataTypes.DATE,
    description: DataTypes.TEXT,
    category: DataTypes.STRING
  });

  LongTerm.associate = function (models) {
    models.LongTerm.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };
  return LongTerm;
};
