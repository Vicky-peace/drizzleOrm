
import { pgTable,serial,text, varchar,integer  } from "drizzle-orm/pg-core";


export const UserTable = pgTable("users",{
    id: serial("id").primaryKey(),
    fullname: text("full_name"),
    phone: varchar("phone", {length: 100}),
    address: varchar("address", {length: 100}),
    score: integer("score"),
})