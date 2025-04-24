import { Response } from 'express'

interface ApiResponse<T> {
  StatusCode: number
  Message: string
  TotalRecord: number
  Data: T | null
}

export class ApiError extends Error {
  public status: number
  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}

const sendApiResponse = <T>(res: Response, statusCode: number, data: T | null, message: string) => {
  const response: ApiResponse<T> = {
    StatusCode: statusCode,
    Message: message,
    TotalRecord: Array.isArray(data) ? data.length : data !== null ? 1 : 0,
    Data: data
  }
  res.status(statusCode).json(response)
}

export default sendApiResponse
