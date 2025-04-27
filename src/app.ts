import express from 'express'
import helmet from 'helmet'
import mongoSanitize from 'express-mongo-sanitize'
import compression from 'compression'
import cors from 'cors'
import 'express-async-errors'

import passport from '~/config/passport'
import routes from '~/routes'
import limiter from '~/middlewares/rate-limiter'
import { errorConverter, errorHandler } from '~/middlewares/error'

const app = express()

app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(mongoSanitize())
app.use(compression())
app.use(cors())
app.options('*', cors())
app.use(passport.initialize())
app.use('/api/user', limiter)
app.use('/', routes)

app.use(errorConverter)
app.use(errorHandler)

export default app
