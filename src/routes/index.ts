import { Router } from "express";





const router  = Router()

const middleRoute = [
    {
        path:"/auth",
        // route: authRouter
    },
    
    {
        path:"/user",
        // route: userRouter
    },
    


]

middleRoute.forEach(route => router.use(route.path,route.route))

export default router