import type { Response } from "express"

export const resJson = (res: Response, status: number, message?: string, data?: object) => {
  const response = { ...(message && { message }), ...(data && { data }) }

  res.status(status).json(response)
}
