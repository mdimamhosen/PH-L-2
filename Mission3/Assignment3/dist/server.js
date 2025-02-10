"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const configurations_1 = require("./app/config/configurations");
const app_1 = __importDefault(require("./app"));
const port = configurations_1.configurations.port || 3000;
let isConneceted = false;
let server;
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const connection = yield mongoose_1.default.connect(configurations_1.configurations.mongoUri);
            console.log(connection.connections[0].host);
            isConneceted = connection.connections[0].readyState === 1;
            if (!isConneceted) {
                console.log('Error connecting to the database');
                process.exit(1);
            }
            if (isConneceted) {
                console.log(`Connected to the database on port ${connection.connections[0].port} and host ${connection.connections[0].host} database name ${connection.connections[0].name}`);
            }
            server = app_1.default.listen(port, () => {
                console.log(`Server is running on port ${port}`);
            });
        }
        catch (error) {
            console.log(error);
            process.exit(1);
        }
    });
}
startServer();
process.on('unhandledRejection', () => {
    console.log('👹Shutting down server due to unhandled promise rejection👹');
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
process.on('SIGTERM', () => {
    console.log('👹SIGTERM RECEIVED. Shutting down server👹');
    if (server) {
        server.close(() => {
            console.log('💥Process terminated💥');
        });
    }
});
process.on('uncaughtException', () => {
    console.log('👹Shutting down server due to uncaught exception👹');
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
