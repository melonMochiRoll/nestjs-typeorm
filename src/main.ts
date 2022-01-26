import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import session from 'express-session';
import helmet from 'helmet';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe() );
  app.enableCors({ origin: true, credentials: true });
  app.use(helmet() );

  app.use(cookieParser() );
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(session({
      secret: process.env.COOKIE_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true
      }
    }));

  const port = process.env.PORT || 3005;
  await app.listen(port);
  console.log(`PORT ${port} : 서버 대기 중`);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();