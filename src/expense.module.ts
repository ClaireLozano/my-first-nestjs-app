import { Module } from '@nestjs/common';
import { ExpenseService } from './application/services/expense.service';
import { PrismaService } from './infrastructure/database/prisma.service';
import { ExpenseController } from './interfaces/controllers/expense.controller';
import { ExpenseDomainService } from './domain/expense/expense-domain.service';
import { ExpensePrismaRepository } from './infrastructure/database/expense/expense-prisma.repository';

@Module({
	controllers: [ExpenseController],
	providers: [
		ExpenseService,
		PrismaService,
		ExpenseDomainService,
		{
			provide: 'ExpenseRepository',
			useClass: ExpensePrismaRepository,
		},
	],
})
export class ExpenseModule {}
