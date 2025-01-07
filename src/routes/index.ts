import { Router } from "express";
import { authRouter } from "../modules/auth/auth.route";
import { accountHeadRouter } from "../modules/account-head/accountHead.route";





const router  = Router()

const middleRoute = [
    {
        path:"/auth",
        route: authRouter
    },
    {
        path:"/accountHead",
        route:accountHeadRouter
    }
    
    // {
    //     path:"/user",
    //     route: userRouter
    // },
    


]

middleRoute.forEach(route => router.use(route.path,route.route))

export default router