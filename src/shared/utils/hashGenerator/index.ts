import bcrypt from 'bcrypt'

export async function generateHash(text: string): Promise<string> {
  return await bcrypt.hash(text, 10);
}