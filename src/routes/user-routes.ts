import express from 'express'

import { register, login, getInfoMine } from '~/controllers/user-controller'
import { authMiddleware } from '~/middlewares/auth-middleware'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/get-info-mine', authMiddleware, getInfoMine)

export default router
