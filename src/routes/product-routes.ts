import express from 'express'

import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getCategoryOptions
} from '~/controllers/product-controller'
import { authMiddleware, adminMiddleware } from '~/middlewares/auth-middleware'
import upload from '~/config/multer'

const router = express.Router()

router.post('/create', authMiddleware, adminMiddleware, upload.array('images', 5), createProduct)
router.get('/get-list', getProducts)
router.get('/get-by-id/:id', getProductById)
router.patch('/update/:id', authMiddleware, adminMiddleware, updateProduct)
router.delete('/delete/:id', authMiddleware, adminMiddleware, deleteProduct)
router.get('/get-list-category-options', getCategoryOptions)

export default router
