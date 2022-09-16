import { createServer } from 'http';

import app from './app';
import { DBConnection } from './database_connection';

const PORT = process.env.PORT || 8000;

const server = createServer(app);

async function startServer() {
  try {
    await DBConnection.sequelize.authenticate();
    console.log('Database Connection has been established successfully.');
    server.listen(PORT, () => {
      console.log(`Listening on port ${server.address().port}...`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

startServer();
