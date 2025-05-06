import express from 'express'

import upload from '~/config/multer'
import { roleController } from '~/controllers'
import { validate } from '~/middlewares/validate'
import { createRoleSchema, updateRoleSchema } from '~/validations'

const router = express.Router()

router.get('/get-list', roleController.getRoleList)
router.get('/get-by-id/:id', roleController.getRoleById)
router.post('/create', upload.single('Avatar'), validate(createRoleSchema), roleController.createRole)
router.patch('/update/:id', upload.single('Avatar'), validate(updateRoleSchema), roleController.updateRole)
router.delete('/delete/:id', roleController.deleteRole)

export default router
