import React, {useState, useEffect, useContext} from 'react'
import { Link, Navigate } from 'react-router-dom';
import { Grid, Header, Form, Message, Segment, Button, Label, FormField, Input } from 'semantic-ui-react'
import { AppContext } from '../context/AuthContext';
import checkAuthCookie from './hooks/checkCookies';
import {isAlphanumeric, isStrongPassword, isEmail} from 'validator';

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
    const [isValidated, setIsValidated] = useState(false)
    if(checkIfCookieExists()){
        return <Navigate to='/'/>
    }

    

    const handleOnSubmit=(e)=>{
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
        }
        
    }
  return (
    <Grid 
    padded='vertically'
    textAlign='center' style={{ height: '90vh', backgroundColor: 'black' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
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
  )
}

