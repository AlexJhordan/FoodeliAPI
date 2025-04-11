import { loginUser, registerUser } from "@/services/authService.js"
import express from "express"

const router = express.Router()

router.post("/register", registerUser)

router.post("/login", loginUser)

export const publicRoutes = router
