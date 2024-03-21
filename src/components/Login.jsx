import React, {useState} from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Grid, Form, Segment, Button, Message, Header, Image } from 'semantic-ui-react'
import checkAuthCookie from './hooks/checkCookies'
import axios from 'axios'
import { AuthContextConsumer } from '../context/AuthContext'

const client_id='b3c2ec986d6b481793bad1372b1445fd'

const client_secret = '4f7c4b046c014f25adf7bb82fb8489e9'

const grantType = `grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('')
  const {dispatch} = AuthContextConsumer()
  const {checkIfCookieExists} = checkAuthCookie()
  if(checkIfCookieExists()){
    return <Navigate to='/' />
  }
  
  const handleOnSubmit=async(e)=>{
    e.preventDefault()
    try {
        const foundUser = await axios('http://localhost:3002/api/user/login', {
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
        
        setUsername('');
        setPassword('');
    } catch (error) {
        console.log(error);
    }
}
  return (
    <div style={{background: 'linear-gradient(109.6deg, rgb(9, 9, 121) 11.2%, rgb(144, 6, 161) 53.7%, rgb(0, 212, 255) 100.2%)', height: '90vh', paddingTop: '15vh', paddingLeft: '20vw'}}>
    <Grid  textAlign='center' style={{backgroundColor: 'black', height: '60vh', padding: '5vh', width: '60vw', borderRadius: '25px'}}
    padded='vertically' verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color='pink' textAlign='center'>
        Login to your account
      </Header>
      <Form onSubmit={handleOnSubmit} size='large'>
        <Segment stacked>
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
        </Segment>
      </Form>
      <Message className='black'>
        New to us?  <Link to='/signup' style={{marginLeft: '4px'}}>Signup</Link>
      </Message>
    </Grid.Column>
  </Grid>
  </div>
  )
}

