module.exports = (sequelize, DataTypes) => {
  const task = sequelize.define('task', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    list: DataTypes.STRING,
    position: DataTypes.STRING,
  }, {});
  task.associate = function (models) {
    models.task.belongsTo(models.board, {
      foreignKey: 'board_id',
    });
  };
  return task;
};