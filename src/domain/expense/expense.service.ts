import { Inject, Injectable } from '@nestjs/common';
import { ExpenseRepository } from './expense-repository.interface';
import { Expense } from './expense.entity';
import { UpdateExpenseInput } from 'src/interfaces/controllers/expense/update-expense.input';
import { CreateExpenseInput } from 'src/interfaces/controllers/expense/create-expense.input';

// Les services du domaine contiennent la logique métier.
@Injectable()
export class ExpenseService {
	constructor(@Inject('ExpenseRepository') private readonly expenseRepository: ExpenseRepository) {}

	async getAllExpenses(): Promise<Expense[]> {
		return await this.expenseRepository.findAll();
	}

	async getExpenseById(id: number): Promise<Expense | null> {
		return await this.expenseRepository.findById(id);
	}

	async createExpense(createExpenseInput: CreateExpenseInput): Promise<Expense> {
		const { amount, comment, nature, purchasedOn, distance, invites } = createExpenseInput;
		const expense = new Expense(null, amount, comment, purchasedOn, new Date(), nature, distance, invites);
		return await this.expenseRepository.create(expense);
	}

	async updateExpense(expenseId: number, updateExpenseInput: UpdateExpenseInput): Promise<Expense | null> {
		const { amount, comment, nature, purchasedOn, distance, invites } = updateExpenseInput;
		const expense = new Expense(expenseId, amount, comment, purchasedOn, new Date(), nature, distance, invites);
		return await this.expenseRepository.update(expenseId, expense);
	}
}
