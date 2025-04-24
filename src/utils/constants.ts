import { JwtPayload } from 'jsonwebtoken'

export enum ApiMessage {
  Success = 'Successful.',
  Fail = 'Failed.'
}

export interface TokenPayload extends JwtPayload {
  sub: string
}
