import { TEMP_UPLOAD_DIR } from './constants/index.js';
import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';
import { createDirectoryIfNotExists } from './utils/createDirectoryIfNotExists.js';

async function startApp() {
  try {
    await initMongoConnection();
    await createDirectoryIfNotExists(TEMP_UPLOAD_DIR);
    setupServer();
  } catch (err) {
    console.error('Application failed to start:', err);
    process.exit(1);
  }
}

startApp();
