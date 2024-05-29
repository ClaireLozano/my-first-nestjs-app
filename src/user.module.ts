import { Module } from '@nestjs/common';
import { PrismaService } from './infrastructure/database/prisma.service';
import { UserController } from './interfaces/controllers/user.controller';
import { UserService } from './application/services/user.service';
import { UserDomainService } from './domain/user/user-domain.service';
import { UserPrismaRepository } from './infrastructure/database/user/user-prisma.repository';

@Module({
	controllers: [UserController],
	providers: [
		UserService,
		PrismaService,
		UserDomainService,
		{
			provide: 'UserRepository',
			useClass: UserPrismaRepository,
		},
	],
	exports: [UserDomainService],
})
export class UserModule {}
