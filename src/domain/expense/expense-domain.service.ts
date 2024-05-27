import { Inject, Injectable } from '@nestjs/common';
import { ExpenseRepository } from './expense-repository.interface';
import { Expense } from './expense.entity';

// Les services du domaine contiennent la logique métier.
@Injectable()
export class ExpenseDomainService {
	constructor(@Inject('ExpenseRepository') private readonly expenseRepository: ExpenseRepository) {}

	async getAllExpenses(): Promise<Expense[]> {
		return await this.expenseRepository.findAll();
	}

	async getExpenseById(id: number): Promise<Expense | null> {
		return await this.expenseRepository.findById(id);
	}

	async createExpense(expense: Expense): Promise<Expense> {
		return await this.expenseRepository.create(expense);
	}

	async updateExpense(id: number, expense: Expense): Promise<Expense | null> {
		return await this.expenseRepository.update(id, expense);
	}
}
