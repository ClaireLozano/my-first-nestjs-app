import { Module } from '@nestjs/common';
import { UserController } from './adapter/api/user.controller';
import { UserPrismaRepository } from './adapter/database/user-prisma.repository';
import { UserService } from './core/service/user.service';
import { PrismaService } from 'src/prisma/prisma.service';

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
