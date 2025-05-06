import express from 'express'

import { roleController } from '~/controllers'

const router = express.Router()

router.get('/get-list', roleController.getRoleList)
router.get('/get-by-id/:id', roleController.getRoleById)
router.post('/create', roleController.createRole)
router.patch('/update/:id', roleController.updateRole)
router.delete('/delete/:id', roleController.deleteRole)

export default router
