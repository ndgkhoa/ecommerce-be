import express from 'express'

import userRoute from '~/routes/user-route'
import roleRoute from '~/routes/sys-role-route'
import { ApiError } from '~/types'

const router = express.Router()

const apiRoutes = [
  { path: '/api/user', route: userRoute },
  { path: '/api/sysrole', route: roleRoute }
]

apiRoutes.forEach(({ path, route }) => {
  router.use(path, route)
})

router.all('*', (req, res, next) => {
  next(new ApiError(404, 'Resource not found.'))
})

export default router
