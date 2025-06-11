import { authConfig } from '@/config/index.js';
import { sign, SignOptions, verify, JwtPayload } from 'jsonwebtoken';

class JWTService {
  async generateToken({
    payload,
    expiresIn = '1h',
  }: {
    payload: { userId: string; email: string };
    expiresIn: SignOptions['expiresIn'];
  }): Promise<string> {
    return new Promise((resolve, reject) => {
      sign(payload, authConfig.jwtSecret, { expiresIn }, (error, token) => {
        if (error) return reject(error);
        else return resolve(token as string);
      });
    });
  }

  async verifyToken({
    token,
    secret,
  }: {
    token: string;
    secret: string;
  }): Promise<JwtPayload | string> {
    return new Promise((resolve, reject) => {
      verify(token, secret, (error, decoded) => {
        if (error) return reject(error);
        else return resolve(decoded as JwtPayload | string);
      });
    });
  }
}

export const jwtService = new JWTService();
