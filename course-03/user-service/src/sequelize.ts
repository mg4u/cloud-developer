import {Sequelize} from 'sequelize-typescript';
import { config } from './config/config';


const c = config.dev;
// console.info('cofig', c)
// Instantiate new Sequelize instance!
export const sequelize = new Sequelize({
  "username": c.username,
  "password": c.password,
  "database": c.database,
  "host":     c.host,

  dialect: c.dialect,
  storage: ':memory:',
  
});

console.log(sequelize.ConnectionError)