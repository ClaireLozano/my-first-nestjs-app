import { Module } from '@nestjs/common';
import { ExpenseController } from './adapters/api/expense.controller';
import { ExpenseService } from './adapters/api/expense.service';
import { PrismaService } from './adapters/database/prisma.service';
import { ExpensePrismaService } from './adapters/database/expense-prisma.service';

@Module({
	controllers: [ExpenseController],
	providers: [ExpenseService, ExpensePrismaService, PrismaService],
})
export class ExpenseModule {}
