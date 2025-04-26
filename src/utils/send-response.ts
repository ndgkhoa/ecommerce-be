import { Response } from 'express'

import { ApiResponse } from '~/types'

const sendResponse = <T>(res: Response, statusCode: number, data: T | null, message: string) => {
  const response: ApiResponse<T> = {
    StatusCode: statusCode,
    Message: message,
    TotalRecord: Array.isArray(data) ? data.length : data !== null ? 1 : 0,
    Data: data
  }
  res.status(statusCode).json(response)
}

export default sendResponse
