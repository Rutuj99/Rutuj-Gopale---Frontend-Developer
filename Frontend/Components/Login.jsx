import React, { useState } from 'react';
import SignUp from './Signup';
import "../Styling/Styles.css"
import { Button,Input } from '@chakra-ui/react';

const Login = () => {

    const [email, setEmail] = useState('umakant@example.com')
    const [password, setPassword] = useState('password')
    const [form, setForm] = useState('login');

    function submit() {
        fetch('http://localhost:3002/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({
                email, password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(res => {
            // console.log(res)
            const {data} = res;
            const {token} = data;

            localStorage.setItem('auth-token', token);

            window.location = '/'
        })
        .catch(console.log)
    }

    return ( 
        <div >
        <div className="background-container">
            {
                form === "login" ?
                <div>
                    <form className="form-login" onSubmit={(e) => {
                        e.preventDefault()
                    }}> <h1>LOGIN</h1>
                        <Input type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} /> <br />
                        <Input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} /> <br />
                        <Button className='button' onClick={submit}>Login</Button> <br />
                    </form>
                    
                </div> : 
                <div>
                    <SignUp />
                </div>
            }
            </div>
        </div>
    )
  
}
 
export default Login;