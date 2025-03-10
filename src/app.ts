import express,{ Application } from "express";
import cors from 'cors'
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import router from "./app/routes";
import cookieParser from "cookie-parser";

const app:Application = express()

app.use(express.json())

app.use(cookieParser())

app.use(cors({
    origin:["https://bicycle-store-assignment4-client.vercel.app","https://bicycle-store-assignment4-client-9imfbmxf9-smnriazs-projects.vercel.app","http://localhost:5173"],
    credentials:true,
}))


app.get('/',(req,res) => {
    res.send("Hello world !")
})

app.use('/api', router)


app.use(globalErrorHandler)


export default app