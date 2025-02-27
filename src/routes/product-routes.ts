import express from 'express'

import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from '~/controllers/product-controller'
import { authMiddleware, adminMiddleware } from '~/middlewares/auth-middleware'
import upload from '~/utils/multer'

const router = express.Router()

router.post('/', authMiddleware, adminMiddleware, upload.single('image'), createProduct)
router.get('/', getProducts)
router.get('/:id', getProductById)
router.put('/:id', authMiddleware, adminMiddleware, updateProduct)
router.delete('/:id', authMiddleware, adminMiddleware, deleteProduct)

export default router
