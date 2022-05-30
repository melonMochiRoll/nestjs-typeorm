import { ValidationPipe } from "@nestjs/common";
import { NestExpressApplication } from "@nestjs/platform-express";
import cookieParser from "cookie-parser";
import session from "express-session";
import helmet from "helmet";
import passport from "passport";
import { createClient } from 'redis';

export const nestjsLoader = async (app: NestExpressApplication) => {
  const RedisStore = require('connect-redis')(session);
  const redisClient = createClient({
    url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
    password: process.env.REDIS_PASSWORD,
  });
  redisClient.on('error', (error: any) => {
    console.error('Redis Client Error', error);
  });

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
      secure: false,
      maxAge: 1200000,
    },
    store: new RedisStore({ client: redisClient, logErrors: true }),
  }));
  
  app.use(passport.initialize());
  app.use(passport.session());
}