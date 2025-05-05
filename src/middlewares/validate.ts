import { Request, Response, NextFunction } from 'express'
import { AnyZodObject } from 'zod'

type ValidateSchema = Partial<Record<'body' | 'query' | 'params', AnyZodObject>>

export const validate = (schema: ValidateSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    for (const [key, validator] of Object.entries(schema)) {
      if (validator) validator.parse(req[key as keyof typeof req])
    }
    next()
  }
}
