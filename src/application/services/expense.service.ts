import { Injectable } from '@nestjs/common';
import { Expense as ExpenseEntity } from 'src/domain/expense/expense.entity';
import { ExpenseDomainService } from 'src/domain/expense/expense-domain.service';
import { CreateExpenseDTO } from 'src/interfaces/dto/create-expense.dto';
import { UpdateExpenseDTO } from 'src/interfaces/dto/update-expense.dto';

// Les services de l'application orchestrent les opérations sans inclure de logique métier.
@Injectable()
export class ExpenseService {
	constructor(private readonly expenseDomainService: ExpenseDomainService) {}

	async getExpenses(): Promise<ExpenseEntity[]> {
		return await this.expenseDomainService.getAllExpenses();
	}

	async getExpense(expenseId: number): Promise<ExpenseEntity | null> {
		return await this.expenseDomainService.getExpenseById(expenseId);
	}

	async createExpense(createExpenseDTO: CreateExpenseDTO): Promise<ExpenseEntity> {
		const { amount, comment, nature, purchasedOn, distance, invites } = createExpenseDTO;
		const expense = new ExpenseEntity(null, amount, comment, purchasedOn, new Date(), nature, distance, invites);
		return await this.expenseDomainService.createExpense(expense);
	}

	async updateExpense(expenseId: number, updateExpenseDTO: UpdateExpenseDTO): Promise<ExpenseEntity | null> {
		const { amount, comment, nature, purchasedOn, distance, invites } = updateExpenseDTO;
		const expense = new ExpenseEntity(expenseId, amount, comment, purchasedOn, new Date(), nature, distance, invites);
		return await this.expenseDomainService.updateExpense(expenseId, expense);
	}
}
