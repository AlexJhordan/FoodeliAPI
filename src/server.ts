import express from "express"
import publicRoutes from "./routes/public.js"

const app = express()
app.use(express.json())

app.use("/", publicRoutes)

app.listen(4000, () => console.log("tentando ;-;"))

// HzsbVLZOg3oMuyhI
// postgresql://postgres:[YOUR-PASSWORD]@db.zhrxidzgomlpwconukrg.supabase.co:5432/postgres