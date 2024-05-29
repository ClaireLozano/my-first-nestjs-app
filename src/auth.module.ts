import { Module } from '@nestjs/common';
import { PrismaService } from './infrastructure/database/prisma.service';
import { AuthController } from './interfaces/controllers/auth.controller';
import { AuthService } from './application/services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './infrastructure/database/security/jwt.strategy';
import { JwtService } from './infrastructure/database/security/jwt.service';
import { UserModule } from './user.module';

console.log(process.env.JWT_SECRET);
@Module({
	imports: [
		UserModule,
		JwtModule.register({
			global: true,
			secret: process.env.JWT_SECRET,
			signOptions: { expiresIn: '60s' },
		}),
	],
	controllers: [AuthController],
	providers: [AuthService, PrismaService, JwtService, JwtStrategy], // ne pas importer le JwtService from @nestjs/jwt car il est déjà importer via le JWTModule
	exports: [AuthService],
})
export class AuthModule {}
