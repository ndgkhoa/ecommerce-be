import express from 'express'

import { permissionController } from '~/controllers'

const router = express.Router()

router.get('/get-list', permissionController.getPermissionList)
router.get('/get-by-id/:id', permissionController.getPermissionById)
router.post('/create', permissionController.createPermission)
router.patch('/update/:id', permissionController.updatePermission)
router.delete('/delete/:id', permissionController.deletePermission)

export default router
