import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginInput {
	@IsNotEmpty()
	@IsString()
	@MinLength(8, { message: 'your password should contains more than 8 chars' })
	password: string;

	@IsNotEmpty()
	@IsEmail({}, { message: 'invalid email' })
	@IsString()
	email: string;
}
