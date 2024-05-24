import { Controller, Get, Param } from '@nestjs/common';
import { ExpenseService } from './expense.service';

@Controller('expenses')
export class ExpenseController {
	constructor(private readonly expenseService: ExpenseService) {}

	@Get()
	public getExpenses() {
		return this.expenseService.getExpenses();
	}

	@Get('/:expenseId')
	public getExpense(@Param('expenseId') expenseId: string) {
		return this.expenseService.getExpense(Number(expenseId));
	}
}
