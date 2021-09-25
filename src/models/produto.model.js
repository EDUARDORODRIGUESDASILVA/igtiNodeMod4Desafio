import {Sequelize} from 'sequelize';
import db from '../repositories/db.js';

const Produto = db.define(
    'produtos',
    {
      codigo: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      descricao: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      preco: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
    },
    {underscored: true},
);

export default Produto;
