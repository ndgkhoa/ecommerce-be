import { Request, Response, NextFunction, RequestHandler } from 'express'

import { ApiResponse } from '~/types'

export const sendResponse = <T>(res: Response, statusCode: number, data: T | null, message: string) => {
  const response: ApiResponse<T> = {
    StatusCode: statusCode,
    Message: message,
    TotalRecord: Array.isArray(data) ? data.length : data !== null ? 1 : 0,
    Data: data
  }
  res.status(statusCode).json(response)
}

export const catchAsync = (fn: RequestHandler): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
}

export const pick = <T extends object, K extends keyof T>(object: T, keys: K[]): Pick<T, K> => {
  return keys.reduce(
    (obj, key) => {
      if (object && Object.prototype.hasOwnProperty.call(object, key)) {
        obj[key] = object[key]
      }
      return obj
    },
    {} as Pick<T, K>
  )
}
