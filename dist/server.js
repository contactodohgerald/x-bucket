"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const logging_1 = __importDefault(require("./config/logging"));
const default_1 = __importDefault(require("./config/default"));
const api_1 = __importDefault(require("./routes/api"));
const connection_1 = __importDefault(require("./database/connection"));
const app = (0, express_1.default)();
//only start the serve if connected to the datebase
const startServer = () => {
    app.use((req, res, next) => {
        //Log the request
        logging_1.default.log(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] `);
        //Logg the response
        res.on('finish', () => {
            logging_1.default.log(`Outgoing -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`);
        });
        next();
    });
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(express_1.default.json());
    app.use(express_1.default.static("public"));
    //rules of the api
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        if (req.method === 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }
        next();
    });
    //routes
    (0, api_1.default)(app);
    //health check
    app.get('/api/v1/health/check', (req, res) => res.status(200).json({ message: 'Health Check Ok' }));
    //error handling
    app.use((req, res) => {
        const error = new Error('Not Found');
        logging_1.default.error(error);
        return res.status(404).json({ message: error.message });
    });
    //start the server
    http_1.default.createServer(app).listen(default_1.default.port(), () => logging_1.default.log(`Server running on port ${default_1.default.port()}`));
};
if ((0, connection_1.default)()) {
    logging_1.default.info("Connected to MongoDB");
    startServer();
}
else {
    logging_1.default.error("Unable to connect to Database");
}
//# sourceMappingURL=server.js.map