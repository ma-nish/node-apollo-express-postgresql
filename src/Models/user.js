// let users = {
//   1: {
//     id: '1',
//     username: 'Manish Maurya',
//     messageIds: [1],
//   },
//   2: {
//     id: '2',
//     username: 'Dave Davids',
//     messageIds: [2],
//   },
// };

// export default users;

const user = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
    },
  });

  User.associate = models => {
    User.hasMany(models.Message, { onDelete: 'CASCADE' });
  };
  
  return User;
};

export default user;