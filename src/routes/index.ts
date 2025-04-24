import express from 'express'

import userRoute from '~/routes/user-route'

const router = express.Router()

const apiRoutes = [{ path: '/api/user', route: userRoute }]

apiRoutes.forEach((route) => {
  router.use(route.path, route.route)
})

export default router
