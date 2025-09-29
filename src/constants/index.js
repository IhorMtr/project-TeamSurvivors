import path from 'node:path';
export const TEMP_UPLOAD_DIR = path.join(process.cwd(), 'temp');
export const UPLOAD_DIR = path.join(process.cwd(), 'uploads');
export const SWAGGER_PATH = path.join(process.cwd(), 'docs', 'swagger.json');
export const allowedOrigins = [
  'http://localhost:3000',
  'https://project-team-survivors-front.vercel.app',
];

export const NOW = new Date();
export const ONE_WEEK = new Date(NOW.getTime() + 7 * 24 * 60 * 60 * 1000);
export const FORTY_TWO_WEEKS = new Date(
  NOW.getTime() + 42 * 7 * 24 * 60 * 60 * 1000,
);

export const CLOUDINARY = {
  CLOUD_NAME: 'CLOUDINARY_NAME',
  API_KEY: 'CLOUDINARY_API_KEY',
  API_SECRET: 'CLOUDINARY_API_SECRET',
  ENABLE_CLOUDINARY: 'ENABLE_CLOUDINARY',
};

export const FIFTEEN_MINUTES = 15 * 60 * 1000;
export const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;
