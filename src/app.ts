import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import MasterRouter from './routes/MasterRouter';
import ErrorHandler from './middlewares/ErrorHandler';
import bodyParser from 'body-parser';
import mongoose, { ConnectOptions } from 'mongoose';

dotenv.config({
    path: '.env'
});

class Server {
    public app = express();
    public router = MasterRouter;
}


const server = new Server();
server.app.use(bodyParser.json());

server.app.use((err: ErrorHandler, _req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof ErrorHandler) {
        res.status(err.statusCode).json({
            status: 'error',
            message: err.message,
            statusCode: err.statusCode
        });
    }
    else {
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
            statusCode: 500
        });
    }
}
);

server.app.use('/api', server.router);

server.app.get('/', (_req: Request, res: Response) => {
    res.send('welcome to the server');
}
);

((port = process.env.PORT || 5000, db = process.env.DB || 'unknown') => {
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
  .then(() =>
  server.app.listen(port, () =>
      console.log(`Server Running on Port: http://localhost:${port}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));
})();