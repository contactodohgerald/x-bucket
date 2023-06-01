import express from 'express';
import http from 'http';

import logger from './config/logging';
import defaults from './config/default';
import combineRouter from './routes/api';
import connection from './database/connection';


const app = express();

//only start the serve if connected to the datebase
const startServer = () => {
    app.use((req, res, next) => {
        //Log the request
        logger.log(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress }] `);

        //Logg the response
        res.on('finish', () => {
            logger.log(`Outgoing -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress }] - Status: [${res.statusCode}]`);
        });

        next();
    })

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(express.static("public"));

    //rules of the api
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        if (req.method === 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }
        next();
    })

    //routes
    combineRouter(app);

    //health check
    app.get('/api/v1/health/check', (req, res) => res.status(200).json({ message: 'Health Check Ok' }));

    //error handling
    app.use((req, res) => {
        const error = new Error('Not Found');
        logger.error(error);

        return res.status(404).json({ message: error.message });
    });

    //start the server
    http.createServer(app).listen(defaults.port(), () => logger.log(`Server running on port ${defaults.port()}`));

}

if(connection()){
    logger.info("Connected to MongoDB")
    startServer()
}else{
    logger.error("Unable to connect to Database")
}