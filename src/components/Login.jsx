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
  const grabSpotifyToken=async ()=>{
    let token = await axios.post('https://accounts.spotify.com/api/token', grantType, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    window.localStorage.setItem('search_token', token.data.access_token)
    window.localStorage.setItem('search_token_time', Date.now())
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
        grabSpotifyToken()
    } catch (error) {
        console.log(error);
    }
}
  return (
    <div>
    <Grid  textAlign='center' style={{ height: '90vh', backgroundColor: 'black'}}
    padded='verically' verticalAlign='middle'>
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
          inverted color='pink' fluid size='large'>
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

