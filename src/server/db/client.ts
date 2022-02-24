import { MongoClient } from 'mongodb';
import { collections } from '@server/db/collections';

export const client = new MongoClient(process.env.MONGO_URL as string);

export async function connectToDB() {
  try {
    await client.connect();
    const db = client.db(process.env.MONGO_DB_NAME);
    collections.users = db.collection('users');
    console.log(`Successfully connected to ${db.databaseName}`);
  } catch (err) {
    console.log('err connect to database', err);
  }
}
