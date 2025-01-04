import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export const hashPassword = (plainText) => bcrypt.hash(plainText, SALT_ROUNDS);
export const comparePassword = (plainText, hash) => bcrypt.compare(plainText, hash);