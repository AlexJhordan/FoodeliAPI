import { type Response } from "express"
import { resJson } from "@/utils/responseHelper.js"
import prisma from "@/utils/client.js"

const listUsers = async (_: any, res: Response) => {
  try {
    const users = await prisma.user.findMany({ omit: { password: true } })

    resJson(res, 200, "Usúarios listados com sucesso.", users)
  } catch (err) {
    console.error("error in /register: ", err)
    resJson(res, 500, "Falha no servidor")
  }
}

export { listUsers }
