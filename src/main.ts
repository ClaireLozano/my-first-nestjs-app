import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	// vérification de la configuration
	const configService = app.get(ConfigService);
	const jwtSecret = configService.get<string>('JWT_SECRET');
	if (!jwtSecret) {
		throw new Error('JWT_SECRET is not defined');
	}

	app.use(
		cors({
			origin: 'http://localhost:4200',
			methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
			credentials: true,
			allowedHeaders: 'Content-Type, Authorization',
		}),
	);

	await app.listen(3000);
}
bootstrap();
