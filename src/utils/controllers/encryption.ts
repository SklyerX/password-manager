import crypto from 'crypto';
const secret = 'qpwoeirufjghnfjdkeoirutjghjfkdoe';

export const encrypt = (password: string) => {
  const iv = Buffer.from(crypto.randomBytes(16));
  const cipher = crypto.createCipheriv('aes-256-ctr', Buffer.from(secret), iv);

  const encryptedPassword = Buffer.concat([cipher.update(password), cipher.final()]);

  return {
    iv: iv.toString('hex'),
    password: encryptedPassword.toString('hex'),
  };
};

export const decrypt = (encryption: any) => {
  const decipher = crypto.createDecipheriv('aes-256-ctr', Buffer.from(secret), Buffer.from(encryption.iv, 'hex'));

  const decryptedPassword = Buffer.concat([decipher.update(Buffer.from(encryption.password, 'hex')), decipher.final()]);

  return decryptedPassword.toString();
};
