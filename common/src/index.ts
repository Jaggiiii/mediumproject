import {z} from "zod"

 export const SignupInput = z.object({
   name:z.string().optional(),
    username:z.string().email(),
    password:z.string().min(7)
 })

 export type SignupInput = z.infer<typeof SignupInput>


 export const SigninInput  = z.object({
    username:z.string().email(),
    password:z.string().min(7)
 })

 export type signinInput = z.infer<typeof SigninInput>

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
