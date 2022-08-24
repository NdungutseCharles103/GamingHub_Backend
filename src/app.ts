import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import MasterRouter from './routes/MasterRouter';
import ErrorHandler from './middlewares/ErrorHandler';
import bodyParser from 'body-parser';
import mongoose, { ConnectOptions } from 'mongoose';
import cors from 'cors';
// import { Swaggiffy } from 'swaggiffy';
import { v2 as cloudinary } from 'cloudinary'

dotenv.config({
    path: '.env'
});

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true
});

class Server {
    public app = express();
    public router = MasterRouter;
}


const server = new Server();
server.app.use(bodyParser.json());
server.app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    // allowedHeaders: ['Content-Type','provider', 'Authorization', 'X-Requested-With', 'Accept', 'Origin', 'Access-Control-Allow-Origin', 'Access-Control-Allow-Headers', 'Access-Control-Allow-Methods', 'Access-Control-Allow-Credentials'],
}));

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
    res.send('welcome to infinity');
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

// new Swaggiffy().setupExpress(server.app).swaggiffy();