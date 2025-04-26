export enum ApiMessage {
  Success = 'Successful.',
  Fail = 'Failed.'
}

export interface TokenPayload {
  sub: string
  jti: string
  roles: string[]
  perms: string[]
  scope?: string
  iss: string
  aud: string
  iat: number
  exp: number
  tenant?: string
  device?: string
  refresh?: boolean
}

export interface ApiResponse<T> {
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
