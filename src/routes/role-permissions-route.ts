import express from 'express'

import { rolePermissionsController } from '~/controllers'

const router = express.Router()

router.get('/get-role-permissions', rolePermissionsController.getRolePermissions)
router.post('/create-role-permissions/:roleId', rolePermissionsController.createRolePermissions)
router.patch('/update-role-permissions', rolePermissionsController.updateRolePermissions)
router.delete('/delete-role-permissions', rolePermissionsController.deleteRolePermissions)

export default router
