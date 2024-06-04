import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from '../../core/service/auth.service';
import { LoginInput } from '../../core/input/login.input';
import { JwtAuthGuard } from '../security/jwt-auth.guard';
import { RequestWithUser } from '../security/jwt.strategy';
import { UserService } from '@domain/user';

@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly userService: UserService,
	) {}

	@HttpCode(HttpStatus.OK)
	@Post('/login')
	public async login(@Body() loginInput: LoginInput) {
		return await this.authService.login(loginInput);
	}

	@UseGuards(JwtAuthGuard)
	@Get()
	public async authenticate(@Request() request: RequestWithUser) {
		return await this.userService.GetUserById(request.user.id);
	}
}
