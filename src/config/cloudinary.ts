import { v2 as cloudinary } from 'cloudinary'

import config from '~/config/env'

cloudinary.config({
  cloud_name: config.CLOUDINARY_CLOUD_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET,
  secure: true
})

export const uploadImage = async (file: Express.Multer.File) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: 'ecommerce',
          format: 'webp',
          quality: 'auto'
        },
        (error, result) => {
          if (error || !result) {
            return reject(error || new Error('Upload failed'))
          }
          resolve({
            uid: result.public_id,
            name: file.originalname,
            url: result.secure_url
          })
        }
      )
      .end(file.buffer)
  })
}

export const deleteImage = async (uid: string) => {
  return cloudinary.uploader.destroy(uid)
}

export default cloudinary
