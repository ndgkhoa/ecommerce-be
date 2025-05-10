import express from 'express'

import { userRolesController } from '~/controllers'

const router = express.Router()

router.get('/get-user-roles/:userId', userRolesController.getUserRoles)
router.post('/create-user-roles/:userId', userRolesController.createUserRoles)
router.delete('/delete-user-roles', userRolesController.deleteUserRoles)

export default router
