import { Request, Response, NextFunction } from 'express'
import { ZodSchema } from 'zod'

export const validate = (schema: Record<string, ZodSchema>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    for (const [key, validator] of Object.entries(schema)) {
      if (validator) validator.parse(req[key as keyof typeof req])
    }
    next()
  }
}
