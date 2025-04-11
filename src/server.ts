import express, { type Application } from "express"
import { publicRoutes } from "./routes/public/auth.js"
import { privateRoutes } from "./routes/private/user.js"

const app: Application = express()

app.use(express.json())

app.use("/", publicRoutes)
app.use("/",  privateRoutes)

app.listen(4000, () => console.log("tentando ;-;"))
