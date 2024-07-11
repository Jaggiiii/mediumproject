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
    // console.log( "jdedken---->",authHeader);
    const token = authHeader.split(" ")[1];

    try {
        const user = await verify(authHeader, c.env.JWT_SECRET) as { id: string } | null;
        if (user) {
            c.set("userId", user.id);
            await next();
        } else {
            return c.json({ message: "You are not logged in" }, 401);
        }
    } catch (e) {
        console.error(e);
        return c.json({ message: "Invalid token" }, 401);
    }
});

// Create a blog post
blogRouter.post('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const body = await c.req.json();
        const { success } = createBlog.safeParse(body);
        if (!success) {
            c.status(400);
            return c.json({ message: "Incorrect inputs" });
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
        c.status(500);
        return c.json({ error: "Internal error in the code" });
    } finally {
        await prisma.$disconnect();
    }
});

// Update a blog post
blogRouter.put('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const body = await c.req.json();
        const { success } = updateBlog.safeParse(body);
        if (!success) {
            c.status(400);
            return c.json({ message: "Incorrect inputs" });
        }

        const blog = await prisma.blog.update({
            where: { id: body.id },
            data: { title: body.title, content: body.content }
        });

        return c.json({ id: blog.id });
    } catch (e) {
        console.error(e);
        c.status(500);
        return c.json({ error: "Internal error in the code" });
    } finally {
        await prisma.$disconnect();
    }
});

// Fetch all blog posts (with pagination to be implemented)
blogRouter.get("/bulk", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const blogs = await prisma.blog.findMany({
            select: {
                content: true,
                title: true,
                id: true,
                author: {
                  select:{
                    name:true
                  }
                }
            }
        });
      console.log(blogs)
        return c.json({ blogs });
    } catch (e) {
        console.error(e);
        c.status(500);
        return c.json({ message: "Error in the code" });
    } finally {
        await prisma.$disconnect();
    }
});

blogRouter.get('/:id', async (c) => {
    const id = c.req.param('id');
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const blog = await prisma.blog.findFirst({
            where: { id: parseInt(id) },
            select:{
                title:true,
                content:true,
                id:true,
               author:{
                select:{
                    name:true
                }
               }
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
    } finally {
        await prisma.$disconnect();
    }
});
