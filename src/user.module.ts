import { Module } from '@nestjs/common';
import { PrismaService } from './infrastructure/database/prisma.service';
import { UserController } from './interfaces/controllers/user/user.controller';
import { UserPrismaRepository } from './infrastructure/database/user/user-prisma.repository';
import { UserService } from './domain/user/user.service';

@Module({
	controllers: [UserController],
	providers: [
		UserService,
		PrismaService,
		{
			provide: 'UserRepository',
			useClass: UserPrismaRepository,
		},
	],
	exports: [UserService],
})
export class UserModule {}
