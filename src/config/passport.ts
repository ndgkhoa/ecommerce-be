import passport from 'passport'
import { ExtractJwt, Strategy as JwtStrategy, VerifiedCallback } from 'passport-jwt'

import config from '~/config/env'
import { JwtPayload } from '~/types'

const jwtOptions = {
  secretOrKey: config.publicKey,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

const jwtVerify = async (payload: JwtPayload, done: VerifiedCallback) => done(null, payload)

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify)

passport.use('jwt', jwtStrategy)

export default passport
