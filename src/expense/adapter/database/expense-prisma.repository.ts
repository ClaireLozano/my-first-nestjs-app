import { Injectable } from '@nestjs/common';
import { ExpenseRepository } from '../../core/expense-repository.interface';
import { Expense as PrismaExpense } from '@prisma/client';
import { Expense } from '../../core/model/expense.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ExpensePrismaRepository implements ExpenseRepository {
	constructor(private readonly prisma: PrismaService) {}

	async findAll(): Promise<Expense[]> {
		const expenses = await this.prisma.expense.findMany();
		return expenses.map(this.toDomain);
	}

	async findById(id: number): Promise<Expense | null> {
		const expense = await this.prisma.expense.findUnique({
			where: {
				id,
			},
		});
		return expense ? this.toDomain(expense) : null;
	}

	async create(expense: Expense): Promise<Expense> {
		const expence = await this.prisma.expense.create({
			data: {
				amount: expense.amount,
				comment: expense.comment,
				purchasedOn: new Date(expense.purchasedOn),
				updatedAt: new Date(),
				nature: expense.nature,
				distance: expense.distance || 0,
				invites: expense.invites || 0,
			},
		});

		return this.toDomain(expence);
	}

	async update(id: number, expense: Expense): Promise<Expense | null> {
		const data = this.toPrisma(expense);
		const updatedExpense = await this.prisma.expense.update({
			data,
			where: {
				id: id,
			},
		});

		return updatedExpense ? this.toDomain(updatedExpense) : null;
	}

	private toDomain(prismaExpense: PrismaExpense): Expense {
		return new Expense(
			prismaExpense.id,
			prismaExpense.amount,
			prismaExpense.comment,
			new Date(prismaExpense.purchasedOn),
			new Date(),
			prismaExpense.nature,
			prismaExpense.invites,
			prismaExpense.distance,
		);
	}

	private toPrisma(expense: Expense): PrismaExpense {
		return {
			id: expense.id,
			amount: expense.amount,
			comment: expense.comment,
			purchasedOn: expense.purchasedOn,
			updatedAt: expense.updatedAt,
			nature: expense.nature,
			distance: expense.distance,
			invites: expense.invites,
		};
	}
}
