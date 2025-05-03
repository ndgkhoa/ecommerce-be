import { Request, Response, NextFunction } from 'express'
import { AnyZodObject, ZodError, ZodSchema } from 'zod'

export const validate = (schema: AnyZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse({ body: req.body, query: req.query, params: req.params })
    if (!result.success) throw new ZodError(result.error.issues)
    next()
  }
}
