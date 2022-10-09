import express from 'express';
import routes from './routes/index';

const app = express();
const port = 3000;

app.use('/', routes);

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});

const myFunc = (num: number): number => {
  return num * num;
};

export default myFunc;
