import { Server } from 'http ';
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
    console.log(connection.connections[0].readyState);

    isConneceted = connection.connections[0].readyState === 1;
    if (!isConneceted) {
      console.log('Error connecting to the database');
      process.exit(1);
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
