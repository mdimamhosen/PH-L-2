import { Server } from 'http';
import app from './app';

const port = 5000;

async function main() {
  try {
    const server: Server = app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
}

main().catch(error => {
  console.error('Error in main function:', error);
});
