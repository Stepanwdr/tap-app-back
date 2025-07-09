import { DataTypes } from 'sequelize';

import sequelize from '../services/sequelize'; // или откуда ты импортируешь sequelize

const Users = sequelize.define('users',
  {
   tgUserId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  firstName: DataTypes.STRING,
  username: DataTypes.STRING,
  score:DataTypes.INTEGER,
  coin:DataTypes.BIGINT,
},
  {
  timestamps: true,
});

export  default  Users