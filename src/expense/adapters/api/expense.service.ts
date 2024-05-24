import { Injectable } from '@nestjs/common';
import { ExpensePrismaService } from '../database/expense-prisma.service';

@Injectable()
export class ExpenseService {
	constructor(private readonly expensePrismaService: ExpensePrismaService) {}

	async getExpenses() {
		const expenses = await this.expensePrismaService.getExpenses();
		return expenses;
	}
}
