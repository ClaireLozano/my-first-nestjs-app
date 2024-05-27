import { Expense } from './expense.entity';

export interface ExpenseRepository {
	findAll(): Promise<Expense[]>;
	findById(id: number): Promise<Expense | null>;
	create(expense: Expense): Promise<Expense>;
	update(id: number, expense: Expense): Promise<Expense | null>;
}
