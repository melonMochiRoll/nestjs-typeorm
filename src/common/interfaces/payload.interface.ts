export interface Payload {
  userId: string;
  nickname: string;
  role: string;
}

export interface JwtPayload {
  sub: string;
  username: string;
  role: string;
}