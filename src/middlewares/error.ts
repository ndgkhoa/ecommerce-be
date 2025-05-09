import { Request, Response, NextFunction } from 'express'

import { ApiError } from '~/types'
import { sendResponse } from '~/utils/helpers'
import { HttpStatus, Message } from '~/constants'

export const errorConverter = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (!(err instanceof ApiError)) err = new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, Message.INTERNAL_SERVER_ERROR)
  next(err)
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (err: ApiError, req: Request, res: Response, next: NextFunction) => {
  sendResponse(res, err.status, null, err.message)
}
