import mongoose from 'mongoose';

// Define a typed cache object stored on the Node global. This prevents multiple
// Mongoose connections when Next.js hot-reloads in development.
interface MongooseCache {
    // The resolved mongoose instance when connection is established
    conn: typeof mongoose | null;
    // The pending promise for a connection attempt (so concurrent calls reuse it)
    promise: Promise<typeof mongoose> | null;
}

declare global {
    // eslint-disable-next-line no-var
    var mongoose: MongooseCache | undefined;
}

// MongoDB connection string from environment variable
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
    // Fail fast if env var is missing — prevents obscure runtime errors later.
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// Initialize global cache if it doesn't exist. In production this will be a
// single server process, but in development Next's HMR creates multiple module
// reloads so caching prevents creating many connections.
let cached: MongooseCache = global.mongoose ?? {conn: null, promise: null};
if (!global.mongoose) {
    global.mongoose = cached;
}

/**
 * Connect to MongoDB using Mongoose and return the mongoose instance.
 *
 * The function caches both an in-flight Promise and the resolved connection
 * on the Node global to avoid creating multiple connections during
 * development (hot reloads) or under concurrent serverless invocations.
 *
 * Returns:
 *  - Promise<typeof mongoose> : resolved mongoose module after successful connect
 */
export async function connectDB(): Promise<typeof mongoose> {
    // Return existing connection if already established
    if (cached.conn) {
        return cached.conn;
    }

    // If there's already a connection attempt in progress, wait for it
    if (!cached.promise) {
        const options = {
            bufferCommands: false,
        };

        // Create a new connection promise and cache it so concurrent calls reuse it
        cached.promise = mongoose.connect(MONGODB_URI!, options)
            .then((mongooseInstance) => {
                return mongooseInstance;
            });
    }

    try {
        // wait for the connection promise to resolve
        cached.conn = await cached.promise;
    } catch (error) {
        // On failure, clear the cached promise so subsequent attempts can retry
        cached.promise = null;
        throw error;
    }

    return cached.conn;
}

export default connectDB;

