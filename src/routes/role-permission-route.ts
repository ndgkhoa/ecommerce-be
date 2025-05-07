import express from 'express'

import { rolePermissionController } from '~/controllers'

const router = express.Router()

router.get('/get-role-permission/:roleId', rolePermissionController.getRolePermission)
router.post('/create-role-permission/:roleId', rolePermissionController.createRolePermission)
router.put('/update-role-permission', rolePermissionController.updateRolePermission)
router.delete('/delete-role-permission', rolePermissionController.deleteRolePermission)

export default router
