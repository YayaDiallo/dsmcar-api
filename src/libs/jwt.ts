import { authConfig } from '@/config/index.js';
import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';

class JWTService {
  async generateToken(
    payload: {
      userId: string;
      email: string;
    },
    expiresIn: SignOptions['expiresIn'] = '1h',
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      jwt.sign(payload, authConfig.jwtSecret, { expiresIn }, (error, token) => {
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
      jwt.verify(token, secret, (error, decoded) => {
        if (error) return reject(error);
        else return resolve(decoded as JwtPayload | string);
      });
    });
  }
}

export const jwtService = new JWTService();
