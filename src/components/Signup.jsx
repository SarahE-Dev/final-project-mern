import React, {useState, useEffect, useContext} from 'react'
import { Link, Navigate } from 'react-router-dom';
import { Grid, Header, Form, Message, Segment, Button, Label, FormField, Input } from 'semantic-ui-react'
import { AppContext } from '../context/AuthContext';
import checkAuthCookie from './hooks/checkCookies';
import {isAlphanumeric, isStrongPassword, isEmail} from 'validator';
import axios from 'axios';
import { AuthContextConsumer } from '../context/AuthContext';
export default function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('')
    const [confirmPasswordError, setConfirmPasswordError] = useState('')
    const {checkIfCookieExists} = checkAuthCookie()
    const {state, dispatch} = AuthContextConsumer()
    if(checkIfCookieExists()){
        return <Navigate to='/'/>
    }

    
    
    const handleOnSubmit=async(e)=>{
        e.preventDefault()
        if(!isAlphanumeric(username)){
            setUsernameError('Username must contain only letters and numbers')
        }
        if(!isEmail(email)){
            setEmailError('Must be valid email address')
        }
        if(!isStrongPassword(password)){
            setPasswordError('Must be strong password')
        }
        if(!(password === confirmPassword)){
            setConfirmPasswordError('Passwords must match')
        }
        if(isEmail(email) && isStrongPassword(password) && isAlphanumeric(username) && (password === confirmPassword)){
            setUsernameError('')
            setPasswordError('');
            setConfirmPasswordError('')
            setEmailError('')
            try {
              
              const newUser = await axios('http://localhost:3002/api/user/signup',{ method: 'post', 
              data: {
              username, password,
              email
              }, 
              withCredentials: true, credentials: true})
              console.log(newUser);
              
              dispatch({type: 'LOGIN', payload: {username: newUser.data.username, email: newUser.data.email, id: newUser.data._id}})
              
              setUsername('')
              setEmail('')
              setPassword('')
              setConfirmPassword('')
              
            } catch (error) {
              console.log(error);
            }  
        }
      
    }
  return (
    <div style={{background: 'linear-gradient(109.6deg, rgb(9, 9, 121) 11.2%, rgb(144, 6, 161) 53.7%, rgb(0, 212, 255) 100.2%)', height: '90vh', paddingTop: '7vh', paddingLeft: '13vw'}}>
    <Grid 
    padded='vertically'
    textAlign='center' style={{backgroundColor: 'black', height: '75vh', padding: '10vh', width: '75vw', borderRadius: '25px'}}verticalAlign='middle'>
    <Grid.Column style={{  marginBottom: '20vh'}}>
      <Header as='h2' color='purple' textAlign='center'>
        Create New Account
      </Header>
      <Form  size='large'>
        <Segment stacked>
            <FormField>
          <Input fluid icon='envelope open' iconPosition='left' 
          value={email}
          onChange={(e)=>setEmail(e.target.value)} 
          required={true} placeholder='Email' type='email' />
          {emailError ?
            <Label pointing prompt>{emailError}</Label> : ''  
        }
          
          </FormField>
          <FormField>
          <Input
            
            fluid
            icon='at'
            iconPosition='left'
            value={username}
          onChange={(e)=>setUsername(e.target.value)}
            placeholder='Username'
            required={true}
            type='username'
          />
          {usernameError ?
            <Label pointing prompt>{usernameError}</Label> : ''  
        }
          </FormField>
          <FormField>
          <Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            value={password}
          onChange={(e)=>setPassword(e.target.value)}
            type='password'
            required={true}
          />
          {passwordError ?
            <Label pointing prompt>{passwordError}</Label> : ''  
        }
          </FormField>
          <FormField>
          <Input
            fluid
            icon='key'
            iconPosition='left'
            required={true}
            value={confirmPassword}
          onChange={(e)=>setConfirmPassword(e.target.value)}
            placeholder='Confirm password'
            type='password'
          />
          {confirmPasswordError ?
            <Label pointing prompt>{confirmPasswordError}</Label> : ''  
        }
        </FormField>
          <Button
          onClick={handleOnSubmit}
          icon='save'
          inverted color='purple' fluid 
          content='Submit'
          size='large' />
        </Segment>
      </Form>
      <Message className='ui black message'>
        Already have an account? <Link style={{marginLeft: '4px'}} to='/login'>Login</Link>
      </Message>
    </Grid.Column>
  </Grid>
  </div>
  )
}

