import fs from 'node:fs/promises';

export async function createDirectoryIfNotExists(url) {
  try {
    await fs.access(url);
  } catch (err) {
    if (err.code === 'ENOENT') {
      await fs.mkdir(url);
    }
  }
}
