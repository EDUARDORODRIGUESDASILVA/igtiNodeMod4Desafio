import express from 'express';
import winston from 'winston';
import produtosRouter from './routes/produtos.routes.js';
import sync from './repositories/db.sync.js';
import {handleError} from './util/error.handler.js';
const app = express();

global.logger = winston.createLogger({
  level: 'silly',
  format: winston.format.json(),
  defaultMeta: {service: 'user-service'},
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    new winston.transports.File(
        {filename: './src/logs/error.log', level: 'error'}),
    new winston.transports.File({filename: './src/logs/combined.log'}),
  ],
});


if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

app.use(express.json());

app.use(sync);


app.use('/produto', produtosRouter);


app.get('/', function(req, res) {
  res.send('IGTI desafio módulo 4.');
});

app.use((err, req, res, next) => {
  handleError(err, res);
});


app.listen(3000, () => {
  logger.info('API Stared');
});
