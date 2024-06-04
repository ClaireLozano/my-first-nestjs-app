import { Module } from '@nestjs/common';
import { AuthController } from './adapter/api/auth.controller';
import { AuthService } from './core/service/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './adapter/security/jwt.strategy';
import { JwtService } from './adapter/security/jwt.service';
import { UserModule } from '@domain/user';

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
	providers: [AuthService, JwtService, JwtStrategy], // ne pas importer le JwtService from @nestjs/jwt car il est déjà importer via le JWTModule
	exports: [AuthService],
})
export class AuthModule {}
