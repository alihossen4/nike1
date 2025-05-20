import {z} from "zod";

const userSignupSchema = z.object({
    username : z.string().min(5),
    name : z.string().min(5),
    email : z.string().email(),
    password : z.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
});
const userSigningSchema = z.object({
    email : z.string().email(),
    password: z.string()
})
export {userSignupSchema, userSigningSchema}