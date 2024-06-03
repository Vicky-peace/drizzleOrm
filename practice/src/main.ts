import "dotenv/config"
import { db } from "./drizzle/db";
import { UserTable } from "./drizzle/schema";
import { sql } from "drizzle-orm";

async function main(){
    await db.delete(UserTable)
    const user = await db
    .insert(UserTable)
    .values([
        {
    name: "Victor",
    age: 23,
    email: "vic@gmail.com"
   },
   {name: "Sally", age: 25, email: "test2@g.com"},
])
   .returning({
    id: UserTable.id,
    userName: UserTable.name,
   })
   .onConflictDoUpdate({
    target: UserTable.email,
    set: {name: "Updated Name"}
   })
   console.log(user)

const users = await db.query.UserTable.findMany({
    columns: {email:true, name: true, id: true},
    extras: {
        lowerCaseName: sql<string>`lower(${UserTable.name})`.as("lowerCaseName"),
    },
    offset: 0,
    with: {preferences:true}
})
console.log(users)
}

main()