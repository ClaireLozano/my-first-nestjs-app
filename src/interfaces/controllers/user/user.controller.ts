import { Body, Controller, Get, Post } from '@nestjs/common';
import { RegisterInput } from './register.input';
import { UserService } from 'src/domain/user/user.service';

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	public getUsers() {
		return this.userService.getUsers();
	}

	@Post('/register')
	public register(@Body() registerInput: RegisterInput) {
		return this.userService.register(registerInput);
	}
}
