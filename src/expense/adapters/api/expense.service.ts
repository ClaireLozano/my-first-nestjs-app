import { Injectable } from '@nestjs/common';
import { ExpensePrismaService } from '../database/expense-prisma.service';

@Injectable()
export class ExpenseService {
	constructor(private readonly expensePrismaService: ExpensePrismaService) {}

	async getExpenses() {
		const expenses = await this.expensePrismaService.getExpenses();
		return expenses;
	}

	async getExpense(expenseId: number) {
		const expenses = await this.expensePrismaService.getExpense(expenseId);
		return expenses;
	}

	async createExpense(expense) {
		await this.expensePrismaService.createExpense(expense);
	}

	async updateExpense(expenseId: number, expense) {
		await this.expensePrismaService.updateExpense(expenseId, expense);
	}
}
