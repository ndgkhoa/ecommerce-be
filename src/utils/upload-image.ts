import cloudinary from '~/config/cloudinary'

export const uploadImageToCloudinary = (fileBuffer: Buffer): Promise<string> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream({ folder: 'ecommerce/products' }, (error, result) => {
      if (error) return reject('Upload ảnh thất bại')
      resolve(result?.secure_url || '')
    })

    uploadStream.end(fileBuffer)
  })
}
