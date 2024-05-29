import { User } from '../user/user.entity';

export interface UserRepository {
	findAll(): Promise<User[]>;
	register(user: User): Promise<User>;
	findByEmail(email: string): Promise<User>;
}
