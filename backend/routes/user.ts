import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, jwt, sign, verify } from 'hono/jwt'
import {signinInput, signupInput} from "@jagadeeshduppa/medium-commom"

export const userRouter = new Hono<{
    Bindings:{
        DATABASE_URL:string,
        JWT_SECRET:string
    }
}>();

userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try {
      const body = await c.req.json();

       const {success} = signupInput.safeParse(body);
       if(!success){
        c.status(411)
         return c.json({
          message :"incorrect inputs"
         })
       }
      const user = await prisma.user.create({
        data: {
          username: body.username,
          password: body.password,
          name:body.name,
        },
      })

      // console.log(" signup credintails ",user);
      const token = await sign({ id: user.id }, c.env.JWT_SECRET);
      return c.json({
        jwt: token
      });
    }
    catch (e) {
      console.log(e);
      c.status(500);
      return c.text("internal error in the code");
    }
  })  
  userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try {
      const body = await c.req.json();
      const {success} = signinInput.safeParse(body);
 
      if(!success){
        c.status(411)
        return c.json({
          message:"incorrect inputs"
        })
      }

      const user = await prisma.user.findUnique({
        where: {
          username: body.username,
          password: body.password
        }
      });
      if (!user) {
        c.status(403)
        return c.json({ error: "user not found" });
      }
      const token = await sign({ id: user.id }, c.env.JWT_SECRET);
      return c.json({
        jwt: token
      });
    }
    catch (e) {
      console.log(e);
      c.status(500);
      return c.json({ error: "internal error in  the code" })
    }
  })
  

