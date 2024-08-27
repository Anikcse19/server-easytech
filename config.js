// config.js
import mongoose from "mongoose";

export const mongooseConnect = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise();
  }
  const uri = process.env.MONGODB_URI;
  return mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
