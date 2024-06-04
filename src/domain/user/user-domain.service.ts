import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/domain/user/user.entity';
import { UserRepository } from './user-repository.interface';

// Les services du domaine contiennent la logique métier.
@Injectable()
export class UserDomainService {
	constructor(@Inject('UserRepository') private readonly userRepository: UserRepository) {}

	async getUsers(): Promise<User[]> {
		return await this.userRepository.findAll();
	}

	async register(userEntity: User): Promise<User> {
		return await this.userRepository.register(userEntity);
	}

	async GetUserById(id: number): Promise<User> {
		return await this.userRepository.findById(id);
	}

	async GetUserByEmail(email: string): Promise<User> {
		return await this.userRepository.findByEmail(email);
	}
}
