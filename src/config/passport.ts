import passport from 'passport'
import { ExtractJwt, Strategy as JwtStrategy, VerifiedCallback } from 'passport-jwt'
import { JwtPayload } from 'jsonwebtoken'

import config from '~/config/env'
import { userService } from '~/services'

const jwtOptions = {
  secretOrKey: config.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

const jwtVerify = async (payload: JwtPayload, done: VerifiedCallback) => {
  try {
    const user = await userService.getUserById(payload.sub!)
    done(null, user)
  } catch (error) {
    done(error, false)
  }
}

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify)

passport.use('jwt', jwtStrategy)

export default passport
