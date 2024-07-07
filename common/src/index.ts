import {z} from "zod"

 export const signupInput = z.object({
    username:z.string().email(),
    password:z.string().min(7),
    name:z.string().optional()
 })

 export type signupInput = z.infer<typeof signupInput>


 export const signinInput  = z.object({
    username:z.string().email(),
    password:z.string().min(8)
 })

 export type signinInput = z.infer<typeof signinInput>

 export const createBlog = z.object({
  title:z.string(),
  content:z.string()
 }) 

 export type createBlog = z.infer<typeof createBlog>   
 
 export const  updateBlog = z.object({
    title:z.string(),
    content:z.string(),
    id:z.number()
 })

 export type  updateBlog = z.infer<typeof updateBlog> 
