import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import connectDB from '~/config/db'
import userRoutes from '~/routes/user-routes'
import categoryRoutes from '~/routes/category-routes'
import productRoutes from '~/routes/product-routes'
import cartRoutes from '~/routes/cart-routes'

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/user', userRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/products', productRoutes)
app.use('/api/cart', cartRoutes)

connectDB()

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
