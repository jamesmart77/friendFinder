
module.exports = function (sequelize, DataTypes) {
  var Friend = sequelize.define("Friend", {
    // Giving the Friends model field names and datatypes
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  return Friend;
};