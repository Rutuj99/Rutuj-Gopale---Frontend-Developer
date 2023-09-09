import { Button,Input} from '@chakra-ui/react';
import React, { useState } from 'react';
import "../Styling/Styles.css"

const SignUp = () => {

    const [name, setName] = useState('umakant@example.com')
    const [email, setEmail] = useState('umakant@example.com')
    const [password, setPassword] = useState('password')

    function submit() {
        fetch('http://localhost:3002/api/auth/register', {
            method: 'POST',
            body: JSON.stringify({
                name, email, password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(res => {
            // console.log(res)
            const {data} = res;

            window.location = '/'
        })
        .catch(console.log)

        
    }

    return ( 
        <div className="background-container">
        <form  className="form-login">
        <h1>SIGN-UP</h1>
            <Input type="name" placeholder="name" onChange={(e) => setName(e.target.value)} /> <br />
            <Input type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} /> <br />
            <Input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} /> <br />
            <Button className='button1' colorScheme="gray" size='md' onClick={submit}>Register</Button> <br />
        </form>
        </div>
     );
}
 
export default SignUp;