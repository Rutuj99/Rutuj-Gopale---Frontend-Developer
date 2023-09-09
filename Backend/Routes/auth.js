import express from 'express'
import { login } from '../Controllers/AuthControll.js';
import { register } from '../Controllers/AuthControll.js';


const authRouter = express.Router();

authRouter.get("/",(req,res)=>{
     res.send("working..")
})

authRouter.post('/register', async (req, res) => {
    try {
        const data = req.body;


        if (!(data.name && data.email && data.password)) {
            return res.status(400).send({
                message: 'Name, email and password are required'
            })
        }

        const user = await register(data.name, data.email, data.password)

        return res.send({
            data: user
        })
    } catch(err) {
        return res.status(500).send({
            message: err.message
        });
    }
})

authRouter.post('/login', async (req, res) => {

    try {
        const data = req.body;



        const {user, token} = await login(data.email, data.password)

        return res.send({
            data: {user, token}
        })
    } catch(err) {
        return res.status(502).send({
            message: err.message
        });
    }
})




export default authRouter