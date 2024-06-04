import { Module } from '@nestjs/common';
import { ExpenseService } from './core/service/expense.service';
import { ExpensePrismaRepository } from './adapter/database/expense-prisma.repository';
import { ExpenseController } from './adapter/api/expense.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
	controllers: [ExpenseController],
	providers: [
		ExpenseService,
		PrismaService,
		{
			provide: 'ExpenseRepository',
			useClass: ExpensePrismaRepository,
		},
	],
})
export class ExpenseModule {}
