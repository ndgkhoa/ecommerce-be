import express from 'express'

import upload from '~/config/multer'
import { userController } from '~/controllers'
import { authenticate } from '~/middlewares/auth'
import { validate } from '~/middlewares/validate'
import { CreateUserSchema, UpdateUserSchema } from '~/validations'

const router = express.Router()

router.post('/login', userController.login)
router.post('/refresh-access-token', userController.refreshAccessToken)
router.get('/get-list', userController.getUserList)
router.get('/get-by-id/:id', userController.getUserById)
router.post('/create', upload.single('Avatar'), validate(CreateUserSchema), userController.createUser)
router.patch('/update/:id', upload.single('Avatar'), validate(UpdateUserSchema), userController.updateUser)
router.delete('/delete/:id', userController.deleteUser)
router.get('/get-info-mine', authenticate, userController.getInfoMine)

export default router
