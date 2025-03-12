import cloudinary from '~/config/cloudinary'

export const uploadImagesToCloudinary = async (files: Express.Multer.File[]): Promise<string[]> => {
  const uploadPromises = files.map((file) => {
    return new Promise<string>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: 'ecommerce/products' }, (error, result) => {
          if (error) return reject(error)
          resolve(result?.secure_url || '')
        })
        .end(file.buffer)
    })
  })

  return Promise.all(uploadPromises)
}
