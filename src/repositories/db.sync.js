import db from './db.js';
// eslint-disable-next-line require-jsdoc
async function start(req, res, next) {
  try {
    await db.authenticate();
    logger.info('Connection has been established successfully.');
  } catch (error) {
    logger.info('Unable to connect to the database:', error);
  }
  await db.sync();

  next();
}
export default start;
