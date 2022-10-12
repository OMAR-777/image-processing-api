/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Request, Response, NextFunction } from 'express';
import routes from './routes/index';
import ExpressError from './utils/ExpressError';

const app = express();

app.use('/', routes);

app.all('*', (req, res, next) => {
  next(new ExpressError('Page Not Found', 404));
});

//even though the next parameter isn't used in this middleware it has to be there for it to be treated as an error handler.
app.use(
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

export default app;
