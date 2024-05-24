import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { CreateExpenseDTO } from '../database/dto/create-expense.dto';
import { UpdateExpenseDTO } from '../database/dto/update-expense.dto';

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

	@Post()
	public addExpense(@Body() createExpenseDTO: CreateExpenseDTO) {
		return this.expenseService.createExpense(createExpenseDTO);
	}

	@Put('/:expenseId')
	public updateExpense(@Param('expenseId') expenseId: string, @Body() updateExpenseDTO: UpdateExpenseDTO) {
		return this.expenseService.updateExpense(Number(expenseId), updateExpenseDTO);
	}
}
