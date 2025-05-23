import jwt from 'jsonwebtoken'
import ms, { StringValue } from 'ms'

import config from '~/config/env'
import { HttpStatusCode, Message } from '~/constants'
import { ApiError, JwtPayload } from '~/types'

const getCurrentTimestamp = () => Math.floor(Date.now() / 1000)

const getExpirationTime = (expiration: string) => {
  const now = getCurrentTimestamp()
  return now + Math.floor(ms(expiration as StringValue) / 1000)
}

export const signAccessToken = (payload: JwtPayload) => {
  return jwt.sign(
    {
      ...payload,
      jti: crypto.randomUUID(),
      iss: config.JWT_ISSUER,
      aud: config.JWT_AUDIENCE,
      iat: getCurrentTimestamp(),
      exp: getExpirationTime(config.JWT_ACCESS_EXP)
    },
    config.privateKey,
    { algorithm: 'RS256' }
  )
}

export const signRefreshToken = (userId: string) => {
  return jwt.sign(
    {
      sub: userId,
      jti: crypto.randomUUID(),
      iat: getCurrentTimestamp(),
      exp: getExpirationTime(config.JWT_REFRESH_EXP),
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
    throw new ApiError(HttpStatusCode.UNAUTHORIZED, Message.INVALID_TOKEN)
  }
}
