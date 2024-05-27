import { Body, Controller, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { ExpenseService } from 'src/application/services/expense.service';
import { CreateExpenseDTO } from '../dto/create-expense.dto';
import { UpdateExpenseDTO } from '../dto/update-expense.dto';

@Controller('expenses')
export class ExpenseController {
	constructor(private readonly expenseService: ExpenseService) {}

	@Get()
	public getExpenses() {
		const expense = this.expenseService.getExpenses();
		if (!expense) {
			throw new NotFoundException('Expense not found');
		}
		return expense;
	}

	@Get('/:expenseId')
	public getExpense(@Param('expenseId') expenseId: string) {
		return this.expenseService.getExpense(Number(expenseId));
	}

	@Post()
	public addExpense(@Body() createExpenseDTO: CreateExpenseDTO) {
		return this.expenseService.createExpense(createExpenseDTO);
	}

	@Put('/:expenseId')
	public updateExpense(@Param('expenseId') expenseId: string, @Body() updateExpenseDTO: UpdateExpenseDTO) {
		const updatedExpense = this.expenseService.updateExpense(Number(expenseId), updateExpenseDTO);
		if (!updatedExpense) {
			throw new NotFoundException('Expense not found');
		}
		return updatedExpense;
	}
}
