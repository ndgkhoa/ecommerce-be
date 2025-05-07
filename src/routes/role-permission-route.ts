import express from 'express'

import { rolePermissionController } from '~/controllers'

const router = express.Router()

router.get('/get-role-permission/:roleId', rolePermissionController.getRolePermission)
router.post('/create-role-permission/:roleId', rolePermissionController.createRolePermission)
// router.patch('/update-role-permission/:id', rolePermissionController.updateRole)
// router.delete('/delete-role-permission/:id', rolePermissionController.deleteRole)

export default router
