import jwt from 'jsonwebtoken'

import config from '~/config/env'
import { HttpStatus, Message } from '~/constants'
import { ApiError, JwtPayload } from '~/types'

export const signAccessToken = (payload: JwtPayload) => {
  const now = Math.floor(Date.now() / 1000)
  return jwt.sign(
    {
      ...payload,
      jti: crypto.randomUUID(),
      iss: config.JWT_ISSUER,
      aud: config.JWT_AUDIENCE,
      iat: now,
      exp: now + config.JWT_ACCESS_EXP
    },
    config.privateKey,
    { algorithm: 'RS256' }
  )
}

export const signRefreshToken = (userId: string) => {
  const now = Math.floor(Date.now() / 1000)
  return jwt.sign(
    {
      sub: userId,
      jti: crypto.randomUUID(),
      iat: now,
      exp: now + config.JWT_REFRESH_EXP,
      refresh: true
    },
    config.JWT_REFRESH_SECRET,
    { algorithm: 'HS512' }
  )
}

export const verifyRefreshToken = (token: string) => {
  try {
    return jwt.verify(token, config.JWT_REFRESH_SECRET) as JwtPayload
  } catch {
    throw new ApiError(HttpStatus.UNAUTHORIZED, Message.INVALID_TOKEN)
  }
}
