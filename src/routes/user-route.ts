import express from 'express'

import upload from '~/config/multer'
import { userController } from '~/controllers'
import { authenticate } from '~/middlewares/auth'
import { validate } from '~/middlewares/validate'
import { createUserSchema, updateUserSchema } from '~/validations'

const router = express.Router()

router.post('/login', userController.login)
router.post('/refresh-access-token', userController.refreshAccessToken)
router.get('/get-list', authenticate, userController.getUserList)
router.get('/get-by-id/:id', userController.getUserById)
router.post('/create', upload.single('Avatar'), validate(createUserSchema), userController.createUser)
router.patch('/update/:id', upload.single('Avatar'), validate(updateUserSchema), userController.updateUser)
router.delete('/delete/:id', userController.deleteUser)
router.get('/get-info-mine', authenticate, userController.getInfoMine)

export default router
