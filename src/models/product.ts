import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    images: {
      type: [
        {
          uid: String,
          name: String,
          url: String
        }
      ],
      required: true
    }
  },
  { timestamps: true }
)

export default mongoose.model('Product', ProductSchema)
