import express from 'express'

import userRoute from '~/routes/user-route'
import { ApiError } from '~/types'

const router = express.Router()

const apiRoutes = [{ path: '/api/user', route: userRoute }]

apiRoutes.forEach(({ path, route }) => {
  router.use(path, route)
})

router.all('*', (req, res, next) => {
  next(new ApiError(404, 'Resource not found.'))
})

export default router
