// src/lib/mongoose.ts
import mongoose from 'mongoose';

/**
 * Connect to MongoDB using the MONGODB_URI env variable.
 * This function is idempotent – it will not create multiple connections.
 */
export async function connectMongo() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI not defined in environment');
  }
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(uri, {
      // useNewUrlParser and useUnifiedTopology are true by default in mongoose >=6
    });
    console.log('🌿 Connected to MongoDB');
  }
}

export default mongoose;
