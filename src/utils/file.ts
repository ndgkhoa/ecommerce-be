import cloudinary from '~/config/cloudinary'

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
            return reject(error || new Error('Upload failed.'))
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
