import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from 'src/application/services/auth.service';
import { LoginDTO } from '../dto/login.dto';
import { JwtAuthGuard } from 'src/infrastructure/security/jwt-auth.guard';
import { RequestWithUser } from 'src/infrastructure/security/jwt.strategy';
import { UserService } from '../../application/services/user.service';

@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly userService: UserService,
	) {}

	@HttpCode(HttpStatus.OK)
	@Post('/login')
	public async login(@Body() loginDto: LoginDTO) {
		return await this.authService.login(loginDto);
	}

	@UseGuards(JwtAuthGuard)
	@Get()
	public async authenticate(@Request() request: RequestWithUser) {
		return await this.userService.getUserById(request.user.id);
	}
}
