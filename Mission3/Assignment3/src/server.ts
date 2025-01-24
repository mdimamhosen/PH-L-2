import { Server } from 'http';
import mongoose from 'mongoose';
import { configurations } from './app/config/configurations';
import app from './app';

const port = configurations.port || 3000;

let isConneceted = false;

let server: Server;

async function startServer() {
  try {
    const connection = await mongoose.connect(
      configurations.mongoUri as string,
    );
    console.log(connection.connections[0].host);

    isConneceted = connection.connections[0].readyState === 1;
    if (!isConneceted) {
      console.log('Error connecting to the database');
      process.exit(1);
    }
    if (isConneceted) {
      console.log(
        `Connected to the database on port ${connection.connections[0].port} and host ${connection.connections[0].host} database name ${connection.connections[0].name}`,
      );
    }
    server = app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
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
