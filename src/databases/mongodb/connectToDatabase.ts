import mongoose from "mongoose";

export async function connectToDatabase() {
  const url = process.env.MONGO_URL as string; 
  if (!url) {
    throw new Error('A variável de ambiente "MONGO_URL" não está definida.');
  }
  await mongoose.connect(url);
  mongoose.set('toJSON', {
    virtuals: true,
    transform: (doc: any, converted: any) => {
      delete converted._id;
    }
  });
}