import cloudinary from '~/config/cloudinary'

export const uploadImage = async (file: Express.Multer.File): Promise<string> => {
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
            return reject(error)
          }
          resolve(result.secure_url)
        }
      )
      .end(file.buffer)
  })
}
