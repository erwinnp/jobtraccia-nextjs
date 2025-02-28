import { db } from '@/db';
import { userTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { TAuthBody } from '../types';

export class UserService {
  static async getUserById(userId: string) {
    const [user] = await db
      .select({
        id: userTable.id,
        username: userTable.username,
        email: userTable.email,
      })
      .from(userTable)
      .where(eq(userTable.id, userId));
    return user || null;
  }

  static async getUserByEmail(userEmail: string) {
    const [user] = await db
      .select()
      .from(userTable)
      .where(eq(userTable.email, userEmail));
    return user || null;
  }

  static async addNewUser(newUser: TAuthBody) {
    const { username, email, password } = newUser;
    const [user] = await db
      .insert(userTable)
      .values({
        username,
        email,
        password,
      })
      .returning();
    return user;
  }
}
