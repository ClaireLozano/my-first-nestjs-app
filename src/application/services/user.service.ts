import { Injectable } from '@nestjs/common';
import { User } from 'src/domain/user/user.entity';
import { UserDomainService } from 'src/domain/user/user-domain.service';
import { RegisterDTO } from 'src/interfaces/dto/register.dto';
import * as bcrypt from 'bcrypt';

// Les services de l'application orchestrent les opérations sans inclure de logique métier.
@Injectable()
export class UserService {
	constructor(private readonly userDomainService: UserDomainService) {}

	async getUsers(): Promise<User[]> {
		return this.userDomainService.getUsers();
	}

	async getUserById(id: number): Promise<User> {
		return this.userDomainService.GetUserById(id);
	}

	async register(registerDTO: RegisterDTO): Promise<User> {
		const hashedPassword = await bcrypt.hash(registerDTO.password, 10);
		const userEntity = new User(Math.random(), registerDTO.name, registerDTO.email, hashedPassword);
		return this.userDomainService.register(userEntity);
	}
}
