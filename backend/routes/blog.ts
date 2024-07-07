import { createBlog, updateBlog } from '@jagadeeshduppa/medium-commom';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono, Context } from "hono";
import { verify } from 'hono/jwt';


export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables: {
        userId: string;
    }
}>();

blogRouter.use("/*", async (c, next) => {
    const authHeader = c.req.header("authorization") || "";
    try {
        const user = await verify(authHeader, c.env.JWT_SECRET) as { id: string } | null;
        if (user) {
            c.set("userId", user.id);
           await  next(); 
        } else {
            return c.json({
                message: "You are not logged in"
            }, 401); 
        }
    } catch (e) {
        console.error(e);
        return c.json({
            message: "Invalid token"
        }, 401);
    }
});


blogRouter.post('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try {
        const body = await c.req.json();
        const {success} = createBlog.safeParse(body);
        if(!success){
            c.status(411)
            return c.json({
             message :"incorrect inputs"
            })
        }
        const authorId = c.get("userId");
        const blog = await prisma.blog.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: Number(authorId)
            }
        });
        return c.json({ id: blog.id });
    } catch (e) {
        console.error(e);
        c.status(411);
        return c.json({ error: "Internal error in the code" });
    }
});
blogRouter.put('/', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const body = await c.req.json();
        const { success } = updateBlog.safeParse(body);
        if(!success){
            c.status(411)
            return c.json({
             message :"incorrect inputs"
            })
        }
        const blog = await prisma.blog.update({
            where: { id: body.id },
            data: { title: body.title, content: body.content }
        });
        return c.json({ id: blog.id });
    } catch (e) {
        console.error(e);
        c.status(411);
        return c.json({ error: "Internal error in the code" });
    }
});

// todo : pagination
blogRouter.get("/bulk", async (c) => {
    const prisma = new PrismaClient({
       datasourceUrl:c.env.DATABASE_URL,
   }).$extends(withAccelerate())
   try {
       const blogs = await prisma.blog.findMany();
       return c.json({ blogs });
   } catch (e) {
       console.error(e);
       c.status(411); 
       return c.json({ message: "Error in the code" });
   }
});

blogRouter.get('/:id', async (c) => {

    const id = c.req.param('id'); 
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try {
        const blog = await prisma.blog.findFirst({ where: { 
            id: parseInt(id)
        } 
    });
        if (!blog) {
            c.status(404); 
            return c.json({ message: "Blog post not found" });
        }
        return c.json({ blog });
    } catch (e) {
        console.error(e);
        c.status(500); 
        return c.json({ message: "Error while fetching blog post" });
    }
});


