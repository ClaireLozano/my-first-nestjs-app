import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class ExpensePrismaService {
	constructor(private readonly prisma: PrismaService) {}

	async getExpenses() {
		const expenses = await this.prisma.expense.findMany({
			select: {
				id: true,
				amount: true,
				comment: true,
				purchasedOn: true,
				updatedAt: true,
				nature: true,
				distance: true,
			},
		});
		return expenses;
	}

	async getExpense(expenseId: number) {
		const expenses = await this.prisma.expense.findUnique({
			select: {
				id: true,
				amount: true,
				comment: true,
				purchasedOn: true,
				updatedAt: true,
				nature: true,
				distance: true,
			},
			where: {
				id: expenseId,
			},
		});
		return expenses;
	}

	async createExpense(expense) {
		await this.prisma.expense.create({
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
	}

	async updateExpense(expenseId: number, expense) {
		await this.prisma.expense.update({
			data: {
				amount: expense.amount,
				comment: expense.comment,
				purchasedOn: new Date(expense.purchasedOn),
				updatedAt: new Date(),
				nature: expense.nature,
				distance: expense.distance || 0,
				invites: expense.invites || 0,
			},
			where: {
				id: expenseId,
			},
		});
	}
}
