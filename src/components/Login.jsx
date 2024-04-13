import React, {useState} from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Grid, Form, Segment, Button, Message, Header, Image } from 'semantic-ui-react'
import checkAuthCookie from './hooks/checkCookies'

import { AuthContextConsumer } from '../context/AuthContext'
import Axios from './utils/Axios'



export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('')
  const {dispatch} = AuthContextConsumer()
  const {checkIfCookieExists, logUserIn, getUserData} = checkAuthCookie()
  if(checkIfCookieExists()){ 
    return <Navigate to='/' />
  }
  
  const handleOnSubmit=async(e)=>{
    e.preventDefault()
    try {
        const foundUser = await Axios('/api/user/login', {
            method: 'post', 
            data: {
            username, password
            }, 
            withCredentials: true, credentials: true});
            console.log(foundUser);
        dispatch({type: 'LOGIN',
            payload: {
            username: foundUser.data.username,
            email: foundUser.data.email,
            id: foundUser.data._id
            
        }})
        getUserData(foundUser.data._id)
        setUsername('');
        setPassword('');
    } catch (error) {
        console.log(error);
    }
}
  return (
    <div style={{background: 'linear-gradient(109.6deg, rgb(9, 9, 121) 11.2%, rgb(144, 6, 161) 53.7%, rgb(0, 212, 255) 100.2%)', height: '90vh', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    <Grid className='logIn'  textAlign='center' style={{backgroundColor: 'black', height: 'fit-content', padding: '2vh 2vh', width: '65vw', borderRadius: '25px', maxWidth: '500px'}}
    padded='vertically' verticalAlign='middle'>
    <Grid.Column style={{ }}>
      <Header as='h2' color='pink' textAlign='center'>
        Login to your account
      </Header>
      <Form onSubmit={handleOnSubmit} size='large'>
        
          <Form.Input 
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
          fluid icon='user' iconPosition='left' placeholder='Username' />
          <Form.Input
            onChange={(e)=>setPassword(e.target.value)}
            value={password}
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
          />

          <Button
          type='submit'
          inverted color='purple' fluid size='large'>
            Login
          </Button>
        
      </Form>
      <Message className='black'>
        New to us?  <Link to='/signup' style={{marginLeft: '4px'}}>Signup</Link>
      </Message>
    </Grid.Column>
  </Grid>
  </div>
  )
}

