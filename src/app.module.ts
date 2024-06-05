import { Module } from '@nestjs/common';
import { ExpenseModule } from './expense/expense.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './database/prisma.service';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: '.env',
		}),
		ExpenseModule,
		AuthModule,
		UserModule,
	],
	controllers: [],
	providers: [PrismaService],
})
export class AppModule {}
