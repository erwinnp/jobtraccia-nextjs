import { db } from '@/db';
import { jobApplicationTable } from '@/db/schema';
import { and, desc, eq, inArray, SQL } from 'drizzle-orm';
import { TNewApplication } from '../types';

export class ApplicationService {
  static async getUserApplications(userId: string, statusFilter?: string) {
    const filters: SQL[] = [];
    filters.push(eq(jobApplicationTable.userId, userId));
    if (statusFilter === 'active') {
      filters.push(
        inArray(jobApplicationTable.applicationStatus, [
          'Applied',
          'Interview Scheduled',
        ])
      );
    }
    if (statusFilter === 'archived') {
      filters.push(
        inArray(jobApplicationTable.applicationStatus, [
          'Offer Received',
          'Rejected',
          'Withdrawn',
        ])
      );
    }

    const applications = await db
      .select()
      .from(jobApplicationTable)
      .orderBy(desc(jobApplicationTable.applicationDate))
      .where(and(...filters));

    return applications;
  }

  static async getApplicationsById(applicationId: string) {
    const [application] = await db
      .select()
      .from(jobApplicationTable)
      .where(eq(jobApplicationTable.id, applicationId));

    return application;
  }

  static async addNewApplication(
    newApplication: TNewApplication,
    userId: string
  ) {
    const [application] = await db
      .insert(jobApplicationTable)
      .values({
        userId: userId,
        ...newApplication,
        createdAt: new Date(),
      })
      .returning();

    return application || null;
  }

  static async updateApplication(
    applicationId: string,
    updatedData: Partial<TNewApplication>
  ) {
    const [updatedApplication] = await db
      .update(jobApplicationTable)
      .set({
        ...updatedData,
      })
      .where(eq(jobApplicationTable.id, applicationId))
      .returning();

    return updatedApplication || null;
  }

  static async deleteApplication(applicationId: string) {
    const [deletedApplication] = await db
      .delete(jobApplicationTable)
      .where(eq(jobApplicationTable.id, applicationId))
      .returning();

    return deletedApplication;
  }
}
