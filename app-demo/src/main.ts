import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Listen for exit signals
  let isClosing = false;
  const closeApp = async () => {
    if (isClosing) return;
    isClosing = true;
    await app.close();
    process.exit(0);
  };

  process.on('SIGTERM', closeApp);
  process.on('SIGINT', closeApp);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
