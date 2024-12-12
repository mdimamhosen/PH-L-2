import app from './app';
import config from './app/config';
import mongoose from 'mongoose';
const port = process.env.PORT || 3000;

async function main() {
  try {
    await mongoose.connect(config.mongoUri as string);
    console.log('Connected to database');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
main();

console.log(process.cwd());

app.listen(config.port, () =>
  console.log(`Example app listening on port ${port}!`),
);
