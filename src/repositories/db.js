import {Sequelize} from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(process.env.DB_CONNECTION_STRING,
    {
      dialect: 'postgres',
      define: {
        timestamps: true,
      },
      logging: (msg) => global.logger.debug(msg),
    });

export default sequelize;
