import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User } from 'src/domain/user/user.entity';
import { UserRepository } from 'src/domain/user/user-repository.interface';

@Injectable()
export class UserPrismaRepository implements UserRepository {
	constructor(private readonly prisma: PrismaService) {}

	async findAll(): Promise<User[]> {
		const users = await this.prisma.user.findMany({
			select: { id: true, name: true, email: true },
		});
		return users.map((user) => new User(user.id, user.name, user.email));
	}

	async findByEmail(email: string): Promise<User> {
		const user = await this.prisma.user.findUnique({ where: { email } });
		if (!user) {
			throw new NotFoundException('User not found');
		}
		return new User(user.id, user.name, user.email, user.password);
	}

	async findById(id: number): Promise<User> {
		const user = await this.prisma.user.findUnique({ where: { id } });
		if (!user) {
			throw new NotFoundException('User not found');
		}
		return new User(user.id, user.name, user.email);
	}

	async register(user: User): Promise<User> {
		const createdUser = await this.prisma.user.create({
			data: {
				name: user.name,
				password: user.password,
				email: user.email,
			},
		});
		return new User(user.id, createdUser.name, createdUser.email, createdUser.password);
	}
}
