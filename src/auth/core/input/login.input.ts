import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginInput {
	@IsNotEmpty()
	@IsString()
	@MinLength(4, { message: 'your password should contains more than 4 chars' })
	password: string;

	@IsNotEmpty()
	@IsEmail({}, { message: 'invalid email' })
	@IsString()
	email: string;
}
