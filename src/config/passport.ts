import passport from 'passport'
import { ExtractJwt, Strategy as JwtStrategy, VerifiedCallback } from 'passport-jwt'

import { publicKey } from '~/config/keys'
import { TokenType } from '~/types'

const jwtOptions = {
  secretOrKey: publicKey,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

const jwtVerify = async (payload: TokenType, done: VerifiedCallback) => done(null, payload)

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify)

passport.use('jwt', jwtStrategy)

export default passport
