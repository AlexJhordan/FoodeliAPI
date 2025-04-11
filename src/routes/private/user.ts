import { auth } from '@/middlewares/auth.js';
import { listUsers } from '@/services/listUsers.js';
import express  from 'express';


const router = express.Router()

router.get("/list-users", auth, listUsers )

export const privateRoutes = router
