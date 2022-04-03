import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { nestjsLoader } from './loaders';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  await nestjsLoader(app);

  const port = process.env.PORT || 3005;
  await app.listen(port);
  console.log(`PORT ${port} : 서버 대기 중`);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();