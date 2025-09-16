import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export async function initMongoConnection() {
  try {
    const user = process.env.MONGODB_USER;
    const pwd = process.env.MONGODB_PASSWORD;
    const url = process.env.MONGODB_URL;
    const db = process.env.MONGODB_DB;

    await mongoose.connect(
      `mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority`,
    );

    console.log('Mongo connection successfully established!');
  } catch (err) {
    console.log(`Error while connecting database ${err}`);
    throw err;
  }
}
