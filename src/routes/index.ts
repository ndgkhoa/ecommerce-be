import express from 'express'

import userRoute from '~/routes/user-route'
import roleRoute from '~/routes/role-route'
import permisstionRoute from '~/routes/permission-route'
import rolePermisstionRoute from '~/routes/role-permission-route'
import userRoleRoute from '~/routes/user-role-route'
import { ApiError } from '~/types'
import { HttpStatusCode, Message } from '~/constants'

const router = express.Router()

const apiRoutes = [
  { path: '/api/user', route: userRoute },
  { path: '/api/role', route: roleRoute },
  { path: '/api/permission', route: permisstionRoute },
  { path: '/api/role-permission', route: rolePermisstionRoute },
  { path: '/api/user-role', route: userRoleRoute }
]

apiRoutes.forEach(({ path, route }) => {
  router.use(path, route)
})

router.all('*', (req, res, next) => {
  next(new ApiError(HttpStatusCode.NOT_FOUND, Message.ROUTE_NOT_FOUND))
})

export default router
