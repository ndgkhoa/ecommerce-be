import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'my_secret_key'
const JWT_EXPIRES_IN = '7d'

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
}

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    return null
  }
}
