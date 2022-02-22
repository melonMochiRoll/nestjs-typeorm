import type { Request } from 'express';
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload, Payload } from "src/common/interfaces/payload.interface";

const cookieExtractor = (request: Request) => {
  var token = null;
    if (request && request.cookies) {
        token = request.cookies['Authorization'];
    }
    return token;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: cookieExtractor,
      ignoreExpiration: false,
      secretOrKey: `${process.env.JWT_SECRET}`,
    })
  }

  async validate(payload: JwtPayload): Promise<Payload> {
    return { userId: payload.sub, email: payload.username, role: payload.role }
  }
}