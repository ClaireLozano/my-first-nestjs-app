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
}
