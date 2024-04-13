// import external libraries
import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import chalk from 'chalk';
import path from 'path';

// import internal libraries
import db from './configs/database.js';
import routers from './routes/routes.js';
import { APP_PORT } from './configs/common.js';

const __dirname = path.resolve();
const app = express();

// middlewares
app.use(express.json());
app.use(cors());
app.use(logger('dev'));

try {
  await db.authenticate();
  console.log(chalk.green('Connect to database successfully'));
} catch (error) {
  console.log(chalk.red('Unable to connect to the database:', error));
}

// create static folder
const uploadForlder = path.join(__dirname, 'src/uploads');
app.use(
  '/uploads',
  express.static(uploadForlder, {
    maxAge: 3600000 * 6,
  })
);

app.use('/api/v1', routers);

app.get('/api', function (req, res) {
  return res.status(200).send({
    name: 'Hotel Booking APIs',
    msg: 'API is running.',
    status: 'OK',
  });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).send({
    name: 'Hotel Booking APIs',
    msg: 'API route not found',
    status: 'ERROR',
  });
});

app.listen(APP_PORT, () => console.log(chalk.green(`Server running at http://localhost:${APP_PORT}`)));
