import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { UserModel, UserThemeModel } from '@server/models';

const sequelizeOptions: SequelizeOptions = {
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  dialect: 'postgres',
  models: [UserModel, UserThemeModel],
};

export const sequelize = new Sequelize(sequelizeOptions);

export const connectToDBClient = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
