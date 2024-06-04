import { Module } from '@nestjs/common';
import { PrismaService } from './infrastructure/database/prisma.service';
import { AuthController } from './interfaces/controllers/auth.controller';
import { AuthService } from './application/services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './infrastructure/security/jwt.strategy';
import { JwtService } from './infrastructure/security/jwt.service';
import { UserModule } from './user.module';
import { UserService } from './application/services/user.service';

console.log(process.env.JWT_SECRET);
@Module({
	imports: [
		UserModule,
		JwtModule.register({
			global: true,
			secret: process.env.JWT_SECRET,
			signOptions: { expiresIn: '6d' },
		}),
	],
	controllers: [AuthController],
	providers: [AuthService, PrismaService, JwtService, JwtStrategy, UserService], // ne pas importer le JwtService from @nestjs/jwt car il est déjà importer via le JWTModule
	exports: [AuthService],
})
export class AuthModule {}
