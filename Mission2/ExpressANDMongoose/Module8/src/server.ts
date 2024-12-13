import app from './app';
import config from './app/config';
import mongoose from 'mongoose';

const port = process.env.PORT || 3000;

let isConnected = false;

async function main() {
  try {
    const connection = await mongoose.connect(config.mongoUri as string);

    if (!isConnected) {
      console.log(`Connected to database ${connection.connection.host}`);
      isConnected = true;
    }
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();

app.listen(config.port, () => {
  console.log(`Example app listening on port ${port}!`);
});
