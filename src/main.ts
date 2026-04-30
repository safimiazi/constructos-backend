import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  // Fail fast if running in production with default secrets
  if (config.get('NODE_ENV') === 'production') {
    const jwtSecret = config.get('JWT_SECRET', '');
    if (!jwtSecret || jwtSecret.includes('fallback') || jwtSecret.includes('CHANGE_THIS')) {
      console.error('FATAL: JWT_SECRET is not set or is using a default value. Set a strong secret before running in production.');
      process.exit(1);
    }
  }

  // Global prefix
  app.setGlobalPrefix(config.get('API_PREFIX', 'v1'));

  // CORS
  const allowedOrigins = config.get('CORS_ORIGIN', 'http://localhost:3000').split(',');
  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) callback(null, true);
      else callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  });

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
      transform: true,
    }),
  );

  // Swagger
  if (config.get('NODE_ENV') !== 'production') {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('ConstructOS API')
      .setDescription('Multi-Tenant SaaS ERP for Construction Companies')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('docs', app, document);
  }

  const port = config.get<number>('PORT', 3001);
  await app.listen(port);
  console.log(`ConstructOS API running on http://localhost:${port}/v1`);
  console.log(`Swagger docs: http://localhost:${port}/docs`);
}

bootstrap();
