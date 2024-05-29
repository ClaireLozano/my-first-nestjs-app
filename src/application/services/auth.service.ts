import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { compare as bcryptCompare } from 'bcrypt';
import { LoginDTO } from '../../interfaces/dto/login.dto';
import { JwtService } from 'src/infrastructure/database/security/jwt.service';
import { UserDomainService } from 'src/domain/user/user-domain.service';
import { User } from 'src/domain/user/user.entity';

// Les services de l'application orchestrent les opérations sans inclure de logique métier.
@Injectable()
export class AuthService {
	constructor(
		private readonly userDomainService: UserDomainService,
		private readonly jwtService: JwtService,
	) {}

	async login(loginDTO: LoginDTO): Promise<{ token: string }> {
		const user = await this.userDomainService.GetUserByEmail(loginDTO.email);
		if (!user) {
			throw new NotFoundException('user not found');
		}

		const isPasswordValid = await this.isPasswordValid(loginDTO.password, user.password);
		if (!isPasswordValid) {
			throw new UnauthorizedException('Invalid credentials');
		}
		console.log('user ok');

		return this.authenticateUser(user);
	}

	private async isPasswordValid(password: string, hashedPassword: string): Promise<boolean> {
		return await bcryptCompare(password, hashedPassword);
	}

	private authenticateUser(user: User): { token: string } {
		const payload = { id: user.id };
		return {
			token: this.jwtService.sign(payload),
		};
	}
}
