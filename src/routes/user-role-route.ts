import express from 'express'

import { userRoleController } from '~/controllers'

const router = express.Router()

router.get('/get-user-roles/:userId', userRoleController.getUserRoles)
router.post('/create-user-roles/:userId', userRoleController.createUserRoles)
router.delete('/delete-user-roles', userRoleController.deleteUserRoles)

export default router
