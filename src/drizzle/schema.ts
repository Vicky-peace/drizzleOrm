
import {integer, pgTable,uuid,varchar,pgEnum,uniqueIndex ,unique,boolean,real, timestamp} from 'drizzle-orm/pg-core';

export const userRole = pgEnum("userRole", ["ADMIN", "BASIC"])

export const UserTable = pgTable("user", {
    id: uuid("id").primaryKey().defaultRandom(),
    name:varchar("name",{length: 255}).notNull(),
    age: integer("age").notNull(),
    email: varchar("email", {length: 255}).notNull(),
    role: userRole("userRole").default("BASIC").notNull(),
}, table => {
    return{
        emailIndex: uniqueIndex("emailIndex").on(table.email),
        uniqueNameAndAge: unique("uniqueNameAndAge").on(table.name, table.age)
    }
})


export const UserPreferencesTable = pgTable("userPreferences", {
    id: uuid("id").primaryKey().defaultRandom(),
    emailUpdates: boolean("emailUpdates").notNull().default(false),
    userId: uuid("userId").references(() => UserTable.id).notNull(),
})

export const PostTable = pgTable("post", {
    id: uuid("id").primaryKey().defaultRandom(),
    title: varchar("title", {length: 255}).notNull(),
    averageRating: real("averageRating").notNull().default(0),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
    authorId: uuid("authorId").references(() => UserTable.id).notNull()
})

// many to many relationship
export const CategoryTable = pgTable("category", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", {length: 255}).notNull(),

})