import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from 'src/application/services/user.service';
import { RegisterDTO } from '../dto/register.dto';

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	public getUsers() {
		return this.userService.getUsers();
	}

	@Post('/register')
	public register(@Body() registerDto: RegisterDTO) {
		return this.userService.register(registerDto);
	}
}
