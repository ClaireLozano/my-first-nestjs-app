import { Module } from '@nestjs/common';
import { PrismaService } from './infrastructure/database/prisma.service';
import { ExpenseController } from './interfaces/controllers/expense/expense.controller';
import { ExpensePrismaRepository } from './infrastructure/database/expense/expense-prisma.repository';
import { ExpenseService } from './domain/expense/expense.service';

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
