import { createId } from '@paralleldrive/cuid2';
import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const userTable = pgTable('users', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId())
    .unique(),
  username: text('username').unique().notNull(),
  email: text('email').unique().notNull(),
  password: text('password').notNull(),
});

export const jobApplicationTable = pgTable('jobApplications', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId())
    .unique(),
  userId: text('userId').notNull(),
  position: text('position').notNull(),
  applicationStatus: text('applicationStatus').notNull(),
  companyName: text('companyName').notNull(),
  companyLocation: text('companyLocation').notNull(),
  applicationDate: timestamp('applicationDate', {
    withTimezone: true,
  }).notNull(),
  applicationSource: text('applicationSource').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
});

export const usersRelation = relations(userTable, ({ many }) => ({
  applications: many(jobApplicationTable),
}));

export const applicationsRelation = relations(
  jobApplicationTable,
  ({ one }) => ({
    user: one(userTable, {
      fields: [jobApplicationTable.userId],
      references: [userTable.id],
    }),
  })
);
