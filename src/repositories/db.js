import {Sequelize} from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

let sequelize = null;

if (process.env.NODE_ENV !== 'production') {
  sequelize = new Sequelize(process.env.DB_CONNECTION_STRING,
      {
        dialect: 'postgres',
        define: {
          timestamps: true,
        },
        logging: (msg) => global.logger.debug(msg),
      });
} else {
  sequelize = new Sequelize({
    dialect: 'postgres',
    host: '172.17.0.2',
    port: 5432,
    database: 'desafio4',
    username: 'postgres',
    password: 'mysecretpassword',
    logging: (msg) => global.logger.debug(msg),
  });
}
export default sequelize;
