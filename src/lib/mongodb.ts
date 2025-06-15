import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/autovault';

interface GlobalMongoose {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongooseClient: GlobalMongoose;
}

if (!global.mongooseClient) {
  global.mongooseClient = {
    conn: null,
    promise: null,
  };
}

async function connectDB(): Promise<typeof mongoose> {
  if (global.mongooseClient.conn) {
    return global.mongooseClient.conn;
  }

  if (!global.mongooseClient.promise) {
    global.mongooseClient.promise = mongoose.connect(MONGODB_URI);
  }

  try {
    const mongoose = await global.mongooseClient.promise;
    global.mongooseClient.conn = mongoose;
    return mongoose;
  } catch (error) {
    global.mongooseClient.promise = null;
    throw error;
  }
}

export default connectDB;
