import { Module } from '@nestjs/common';
import { ExpenseModule } from './expense.module';

@Module({
	imports: [ExpenseModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
