import { compareSync, genSaltSync, hashSync } from 'bcrypt-ts';

export const hashPassword = (hash: string) => {
  const salt = genSaltSync(10);
  return hashSync(hash, salt);
};

export const verifyPassword = (password: string, userPassword: string) => {
  return compareSync(password, userPassword);
};
