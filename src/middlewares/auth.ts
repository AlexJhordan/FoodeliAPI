import { env } from "@/env.js"
import { resJson } from "@/utils/responseHelper.js"
import type { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

const { JWT_SECRET_KEY } = env

export const auth = (req: { userId?: any } & Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    resJson(res, 401, "Acesso negado.")
    return
  }
  const token = authHeader.replace("Bearer ", "")

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET_KEY) as { id: string }

    req.userId = decodedToken.id

    next()
  } catch (err) {
    resJson(res, 401, "Token inválido")
    return
  }
}
