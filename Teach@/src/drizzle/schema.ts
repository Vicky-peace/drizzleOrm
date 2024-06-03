
import { create } from "domain";
import { pgTable,serial,text, varchar,integer,uuid, timestamp   } from "drizzle-orm/pg-core";


export const UserTable = pgTable("users",{
    id: uuid("id").primaryKey().defaultRandom(),
    fullname: text("full_name"),
    phone: varchar("phone", {length: 100}),
    address: varchar("address", {length: 100}),
    score: integer("score"),
    email:varchar("email", {length: 100}).notNull().unique(),
    password: text("password").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
});

//Define Post table schema
export const PostTable = pgTable("posts",{
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").references(()=>UserTable.id),
    content: text('content').notNull(),
    createdAt: timestamp("created_at").defaultNow(),
});

//Define the comments table schema
export const CommentTable = pgTable("comments", {
    id : uuid("id").primaryKey().defaultRandom(),
    postId: uuid("post_id").references(()=>PostTable.id),
    userId: uuid("user_id").references(() => UserTable.id),
    content: text("content").notNull(),
    createdAt: timestamp("created_at").defaultNow()
});

//define the likes schema
export const LikeTable = pgTable("likes",{
    id: uuid("id").primaryKey().defaultRandom(),
    postId: uuid("post_id").references(() => PostTable.id),
    userId: uuid("user_id").references(() => UserTable.id),
    createdAt: timestamp("created_at").defaultNow(),
});

//Define a follow table schema
export const FollowTable = pgTable("follows",{
    id: uuid("id").primaryKey().defaultRandom(),
    followerId: uuid('folloer_id').references(()=> UserTable.id),
    followingId: uuid("following_id").references(()=>UserTable.id),
    createdAt: timestamp("created_at").defaultNow(),
});