export class UpdateExpenseDTO {
	amount: number;
	comment: string;
	purchasedOn: Date;
	nature: 'trip' | 'restaurant';
	distance?: number;
	invites?: number;
}
