module.exports = (sequelize, DataTypes) => {
  const board = sequelize.define('board', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: DataTypes.STRING,
  }, {});
  board.associate = function(models) {
    models.board.belongsTo(models.user, {
        foreignKey: 'owner_id',
    });
};
  return board;
};