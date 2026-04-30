"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const config_1 = require("@nestjs/config");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = app.get(config_1.ConfigService);
    if (config.get('NODE_ENV') === 'production') {
        const jwtSecret = config.get('JWT_SECRET', '');
        if (!jwtSecret || jwtSecret.includes('fallback') || jwtSecret.includes('CHANGE_THIS')) {
            console.error('FATAL: JWT_SECRET is not set or is using a default value. Set a strong secret before running in production.');
            process.exit(1);
        }
    }
    app.setGlobalPrefix(config.get('API_PREFIX', 'v1'));
    const allowedOrigins = config.get('CORS_ORIGIN', 'http://localhost:3000').split(',');
    app.enableCors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin))
                callback(null, true);
            else
                callback(new Error('Not allowed by CORS'));
        },
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: false,
        transform: true,
    }));
    if (config.get('NODE_ENV') !== 'production') {
        const swaggerConfig = new swagger_1.DocumentBuilder()
            .setTitle('ConstructOS API')
            .setDescription('Multi-Tenant SaaS ERP for Construction Companies')
            .setVersion('1.0')
            .addBearerAuth()
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
        swagger_1.SwaggerModule.setup('docs', app, document);
    }
    const port = config.get('PORT', 3001);
    await app.listen(port);
    console.log(`ConstructOS API running on http://localhost:${port}/v1`);
    console.log(`Swagger docs: http://localhost:${port}/docs`);
}
bootstrap();
//# sourceMappingURL=main.js.map