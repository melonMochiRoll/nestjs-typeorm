export interface Payload {
  userId: string;
  email: string;
  role: string;
}

export interface JwtPayload {
  sub: string;
  username: string;
  role: string;
}