import { z } from 'zod';
import mongoose from 'mongoose';

// Custom validator for MongoDB ObjectId
export const objectId = z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
  message: 'Invalid ObjectId',
});

// Custom password validator
export const password = z.string()
  .min(8, 'Password must be at least 8 characters')
  .max(32, 'Password must not exceed 32 characters')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number');