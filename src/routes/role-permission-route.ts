import express from 'express'

import { rolePermissionController } from '~/controllers'

const router = express.Router()

router.get('/get-role-permissions/:roleId', rolePermissionController.getRolePermissions)
router.post('/create-role-permissions/:roleId', rolePermissionController.createRolePermissions)
router.put('/update-role-permissions', rolePermissionController.updateRolePermissions)
router.delete('/delete-role-permissions', rolePermissionController.deleteRolePermissions)

export default router
