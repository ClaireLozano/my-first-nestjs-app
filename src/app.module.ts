import { Module } from '@nestjs/common';
import { ExpenseModule } from './expense.module';
import { AuthModule } from './auth.module';
import { UserModule } from './user.module';
import { ConfigModule } from '@nestjs/config';

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
	providers: [],
})
export class AppModule {}
