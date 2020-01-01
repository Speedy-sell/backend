import * as bcrypt from 'bcryptjs';

export function encrypt(password) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}
