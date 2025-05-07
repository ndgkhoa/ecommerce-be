import express from 'express'

import userRoute from '~/routes/user-route'
import roleRoute from '~/routes/role-route'
import permisstionRoute from '~/routes/permission-route'
import rolePermisstionRoute from '~/routes/role-permission-route'
import { ApiError } from '~/types'

const router = express.Router()

const apiRoutes = [
  { path: '/api/user', route: userRoute },
  { path: '/api/role', route: roleRoute },
  { path: '/api/permission', route: permisstionRoute },
  { path: '/api/role-permission', route: rolePermisstionRoute }
]

apiRoutes.forEach(({ path, route }) => {
  router.use(path, route)
})

router.all('*', (req, res, next) => {
  next(new ApiError(404, 'Resource not found.'))
})

export default router
