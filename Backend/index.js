
import express from 'express'
import cors from 'cors'
import authRouter from './Routes/auth.js'
import { connectDatabase } from './Db/connectDatabase.js'
const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/auth', authRouter)



connectDatabase()
.then(() => {
    app.listen(3002, () => {
        console.log('Server running on http://localhost:3002')
    })
})