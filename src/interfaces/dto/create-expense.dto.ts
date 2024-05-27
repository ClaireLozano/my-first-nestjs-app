export class CreateExpenseDTO {
	amount: number;
	comment: string;
	nature: 'trip' | 'restaurant';
	purchasedOn: Date;
	distance?: number;
	invites?: number;
}
