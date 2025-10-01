// lib/mongodb.ts
import mongoose from 'mongoose';

interface Cached {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // Solo añadimos nuestra propiedad personalizada
  // (Next.js recarga archivos, por eso usamos var)
  // eslint-disable-next-line no-var
  var mongoose: Cached | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let cached = global.mongoose;

if (!cached) {
  cached = { conn: null, promise: null };
  global.mongoose = cached; // aseguramos que global siempre tenga el objeto
}

async function dbConnect() {
  if (cached!.conn) {
    return cached!.conn;
  }

  if (!cached!.promise) {
    cached!.promise = mongoose.connect(MONGODB_URI).then((m) => {
      return m;
    });
  }

  cached!.conn = await cached!.promise;
  return cached!.conn;
}

export default dbConnect;
