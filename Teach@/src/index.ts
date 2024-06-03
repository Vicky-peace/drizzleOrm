import "dotenv/config"
import { db } from "./drizzle/db";
import { UserTable,PostTable,CommentTable, LikeTable,FollowTable } from "./drizzle/schema";


async function exampleOperations(){
    //create anew user
    const newUser = await db.insert(UserTable)
    .values([
        {
            fullname: 'John Doe',
            phone: "1234567",
            address: '123 Mian St',
            score: 10,
            email: "testjohn@example",
            password: '12mddk'
        }
    ])
    .returning({
        id: UserTable.id,
        fullname: UserTable.fullname,
    })
}

exampleOperations().catch(console.error)