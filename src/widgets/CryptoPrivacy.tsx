
import crypto from 'crypto';

export const generateEncryptedKey = (data: any) => {
  try {
    const algorithm = 'aes-256-cbc';
    const iv = Buffer.from('1MSkHLVvJcWsezV3', 'utf8');

    const key = crypto.randomBytes(32);

    const cipher = crypto.createCipheriv(algorithm, key, iv);

    const dataString = JSON.stringify(data); // Convert data object to a string

    let encrypted = cipher.update(dataString, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return {
      iv: iv.toString('hex'),
      sek: encrypted,
      hash: key.toString('hex'),
    };
  } catch (error) {
    console.log(error);
  }
};
