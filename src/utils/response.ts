import { Response } from 'express'

interface ApiResponse<T> {
  Data: T | null
  TotalRecord: number
  StatusCode: number
  Message: string
}

export const sendResponse = <T>(res: Response, statusCode: number, data: T | null, message: string) => {
  const response: ApiResponse<T> = {
    Data: data,
    TotalRecord: Array.isArray(data) ? data.length : data ? 1 : 0,
    StatusCode: statusCode,
    Message: message
  }

  res.status(statusCode).json(response)
}
