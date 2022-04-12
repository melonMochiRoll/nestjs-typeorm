import { ValidationPipe } from "@nestjs/common";
import { NestExpressApplication } from "@nestjs/platform-express";
import cookieParser from "cookie-parser";
import session from "express-session";
import helmet from "helmet";
import passport from "passport";

export const nestjsLoader = async (app: NestExpressApplication) => {
  app.useGlobalPipes(new ValidationPipe() );
  app.enableCors({
    origin: true,
    credentials: true,
  });
  app.use(helmet() );

  app.use(cookieParser() );
  app.use(session({
      secret: `${process.env.COOKIE_SECRET}`,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
      }
    }));
  app.use(passport.initialize());
  app.use(passport.session());
}