import express from 'express'

import { createCategory, getCategories, deleteCategory, updateCategory } from '~/controllers/category-controller'
import { authMiddleware, adminMiddleware } from '~/middlewares/auth-middleware'

const router = express.Router()

router.post('/', authMiddleware, adminMiddleware, createCategory)
router.get('/', getCategories)
router.put('/:id', authMiddleware, adminMiddleware, updateCategory)
router.delete('/:id', authMiddleware, adminMiddleware, deleteCategory)

export default router
