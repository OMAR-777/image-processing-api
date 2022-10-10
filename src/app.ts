import express, { Request, Response, NextFunction } from 'express';
import routes from './routes/index';
import ExpressError from './utils/ExpressError';

const app = express();

app.get('/haha', (req, res) => {
  res.send('hehe');
});

app.use('/', routes);

app.all('*', (req, res, next) => {
  next(new ExpressError('Page Not Found', 404));
});

app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: ExpressError, req: Request, res: Response, next: NextFunction) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!';
    res.status(statusCode).send('Error:' + err.message);
  }
);

const port = 3000;

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});

// const myFunc = (num: number): number => {
//   return num * num;
// };

export default app;
