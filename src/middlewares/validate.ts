import { Request, Response, NextFunction } from 'express'
import { ZodSchema } from 'zod'

export const validate = (schema: Record<string, ZodSchema>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (schema.body) req.body = schema.body.parse(req.body)
    if (schema.query) req.query = schema.query.parse(req.query)
    if (schema.params) req.params = schema.params.parse(req.params)
    next()
  }
}
