import jwt, { SignOptions, JwtPayload } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRE = process.env.JWT_EXPIRE || '7d';

interface TokenPayload {
  id: number;
}

export const generateToken = (userId: number): string => {
  return jwt.sign(
    { id: userId } as TokenPayload,
    JWT_SECRET as jwt.Secret,
    { expiresIn: JWT_EXPIRE as jwt.SignOptions['expiresIn'] }
  );
};

export const verifyToken = (token: string): TokenPayload => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET as jwt.Secret) as JwtPayload;
    return { id: decoded.id };
  } catch (error) {
    throw new Error('Invalid token');
  }
};
