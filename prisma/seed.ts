import { prisma } from "@/lib/prisma"

export const FAKE_POSTS=[
    {
       
        title:"First Post",
        body:"Praesent quis orci sit amet ante facilisis suscipit. Integer in eros molestie, ultricies arcu ac, cursus quam. Nulla facilisi. Ut egestas semper magna ac condimentum. Aliquam erat volutpat. Sed bibendum sollicitudin orci, at viverra metus vehicula sed."
    },
     {
    
        title:"Second Post",
        body:"Praesent quis orci sit amet ante facilisis suscipit. Integer in eros molestie, ultricies arcu ac, cursus quam. Nulla facilisi. Ut egestas semper magna ac condimentum. Aliquam erat volutpat. Sed bibendum sollicitudin orci, at viverra metus vehicula sed."
    },
     {
        title:"Third Post",
        body:"Praesent quis orci sit amet ante facilisis suscipit. Integer in eros molestie, ultricies arcu ac, cursus quam. Nulla facilisi. Ut egestas semper magna ac condimentum. Aliquam erat volutpat. Sed bibendum sollicitudin orci, at viverra metus vehicula sed."
    }
]

const seed =async()=>{
    await prisma.posts.deleteMany();
    await prisma.posts.createMany({
        data:FAKE_POSTS
    })
    console.log("database seeded")
}

seed()