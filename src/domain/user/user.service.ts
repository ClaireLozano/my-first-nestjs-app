import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/domain/user/user.entity';
import { UserRepository } from './user-repository.interface';
import { RegisterInput } from 'src/interfaces/controllers/user/register.input';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
	constructor(@Inject('UserRepository') private readonly userRepository: UserRepository) {}

	async getUsers(): Promise<User[]> {
		return await this.userRepository.findAll();
	}

	async register(registerInput: RegisterInput): Promise<User> {
		const hashedPassword = await bcrypt.hash(registerInput.password, 10);
		const userEntity = new User(Math.random(), registerInput.name, registerInput.email, hashedPassword);
		return await this.userRepository.register(userEntity);
	}

	async GetUserById(id: number): Promise<User> {
		return await this.userRepository.findById(id);
	}

	async GetUserByEmail(email: string): Promise<User> {
		return await this.userRepository.findByEmail(email);
	}
}
