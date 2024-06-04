import { Body, Controller, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { CreateExpenseInput } from '../../../expense/core/input/create-expense.input';
import { ExpenseService } from '../../core/service/expense.service';
import { UpdateExpenseInput } from '../../core/input/update-expense.input';

@Controller('expenses')
export class ExpenseController {
	constructor(private readonly expenseService: ExpenseService) {}

	@Get()
	public getExpenses() {
		const expense = this.expenseService.getAllExpenses();
		if (!expense) {
			throw new NotFoundException('Expense not found');
		}
		return expense;
	}

	@Get('/:expenseId')
	public getExpense(@Param('expenseId') expenseId: string) {
		return this.expenseService.getExpenseById(Number(expenseId));
	}

	@Post()
	public addExpense(@Body() createExpenseInput: CreateExpenseInput) {
		return this.expenseService.createExpense(createExpenseInput);
	}

	@Put('/:expenseId')
	public updateExpense(@Param('expenseId') expenseId: string, @Body() updateExpenseInput: UpdateExpenseInput) {
		const updatedExpense = this.expenseService.updateExpense(Number(expenseId), updateExpenseInput);
		if (!updatedExpense) {
			throw new NotFoundException('Expense not found');
		}
		return updatedExpense;
	}
}
