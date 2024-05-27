export class Expense {
	constructor(
		public readonly id: number,
		public amount: number,
		public comment: string,
		public purchasedOn: Date,
		public updatedAt: Date,
		public nature: string,
		public distance: number,
		public invites: number,
	) {}
}
