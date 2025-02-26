import mongoose from 'mongoose';
import config from './app/config';
import app from './app';
import { Server } from 'http';

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    server = app.listen(config.port, () => {
      console.log(
        `🚴‍♀️BicycleStore is listening at http://localhost:${config.port}`
      );
    });
  } catch (err) {
    console.log(err);
  }
}

process.on('unhandledRejection', () => {
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
});

process.on('unhandledRejection', () => {
  process.exit(1);
});

main();
