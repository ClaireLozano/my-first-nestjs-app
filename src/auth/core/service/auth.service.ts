import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { compare as bcryptCompare } from 'bcrypt';
import { LoginInput } from '../input/login.input';
import { JwtService } from '../../adapter/security/jwt.service';
import { UserPayload } from '../../adapter/security/jwt.strategy';
import { User } from 'src/user/core/model/user.entity';
import { UserService } from 'src/user/core/service/user.service';

// Les services de l'application orchestrent les opérations sans inclure de logique métier.
@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
	) {}

	async login(loginInput: LoginInput): Promise<{ token: string }> {
		const user = await this.userService.getUserByEmail(loginInput.email);
		if (!user) {
			throw new NotFoundException('user not found');
		}

		const isPasswordValid = await this.isPasswordValid(loginInput.password, user.password);
		if (!isPasswordValid) {
			throw new UnauthorizedException('Invalid credentials');
		}

		return this.authenticateUser(user);
	}

	private async isPasswordValid(password: string, hashedPassword: string): Promise<boolean> {
		return await bcryptCompare(password, hashedPassword);
	}

	private authenticateUser(user: User): { token: string; user: Omit<User, 'password'> } {
		const payload: UserPayload = { id: user.id };
		const { password, ...userWithoutPassword } = user;
		return {
			user: userWithoutPassword,
			token: this.jwtService.sign(payload),
		};
	}
}
