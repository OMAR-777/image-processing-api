import express, { Request, Response } from 'express';
import routes from './routes/index';
import ExpressError from './utils/ExpressError';

const app = express();

app.get('/haha', (req, res) => {
  console.log('hehe');
  res.send('hehe');
});

app.use('/', routes);

app.all('*', (req, res, next) => {
  next(new ExpressError('Page Not Found', 404));
});

app.use((err: ExpressError, req: Request, res: Response) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = 'Oh No, Something Went Wrong!';
  res.status(statusCode).send('Error:' + err.message);
});

const port = 3000;

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});

const myFunc = (num: number): number => {
  return num * num;
};

export default myFunc;
