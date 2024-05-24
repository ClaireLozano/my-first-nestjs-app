export class UpdateExpenseDTO {
	id: number;
	amount: number;
	comment: string;
	purchasedOn: Date;
	nature: 'trip' | 'restaurant';
	distance?: number;
	invites?: number;
}
