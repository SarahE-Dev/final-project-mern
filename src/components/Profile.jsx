import React, {useState, useEffect} from 'react'
import { AuthContextConsumer } from '../context/AuthContext'
import { Form, Input, FormField, Label, Button, ButtonGroup, Icon } from 'semantic-ui-react'
import {isAlphanumeric, isEmail} from 'validator'
import axios from 'axios'
import checkAuthCookie from './hooks/checkCookies'


export default function Profile() {
    const {state, dispatch} = AuthContextConsumer()
    const [isEditable, setIsEditable] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const {checkIfCookieExists, logUserIn} = checkAuthCookie()
    useEffect(() => {
      if(state && state.user){
        setEmail(state.user.email)
        setUsername(state.user.username)
        
      }
      
    }, [state])

    useEffect(() => {
      handleErrors()
    }, [username, email])
    
    
    const handleSubmit = async(e) =>{
        e.preventDefault()
        if(usernameError || emailError){
            return
        }
        if(usernameError === '' && emailError === '' && username && email && !(username === state.user.username && email === state.user.email)){ 
          console.log(username, email);
            try {
              const updatedUser = await axios(`http://localhost:3002/api/user/update-user-info/${state.user.id}`, {
                method: 'post', 
                data: {
                username, email
                }, 
                withCredentials: true, credentials: true} )
                console.log(updatedUser);
                dispatch({type: 'LOGIN', payload: {username: updatedUser.data.username, email: updatedUser.data.email, id: updatedUser.data._id}})
                setIsEditable(false)
            } catch (error) {
              console.log(error);
            }

            
        }
      }
    const handleErrors=()=>{
        if(!isAlphanumeric(username)){
            setUsernameError('Username must contain only letters and numbers')
        }
        if(!isEmail(email)){
            setEmailError('Must be valid email address')
        }
        if(isAlphanumeric(username)){
            setUsernameError('')
        }
        if(isEmail(email)){
            setEmailError('')
        }
    }
    
  return (
    <div style={{backgroundColor: 'black', marginLeft: '15vw', color: 'white', height: '90vh', paddingBottom: '15vh'}}>
        <div style={{width: '50vw', margin: 'auto', paddingTop: '10vh', textAlign: 'center'}}>
        <Label color='purple' size='massive' content='Profile Info' style={{margin: '5vh', outline: '2px solid white'}} />
        <Form style={{padding: '5vh', border: '2px solid white', borderRadius: '20px'}}>
            
            <FormField>
                {
                    isEditable && 
                    <input
                    onChange={(e)=>{ setUsername(e.target.value)}}
                value={username}
                />
                }
                {usernameError && <Label pointing prompt color='red'>{usernameError}</Label>}
                {!isEditable && <h1 style={{fontSize: '2rem'}}>{state &&state.user &&state.user.username}</h1>}
                
                
            </FormField>
            <FormField>
                {isEditable && <input
                onChange={(e)=>{ setEmail(e.target.value) }}
                value={email}/>}
                {!isEditable && <h1 style={{fontSize: '2rem'}}>{state &&state.user &&state.user.email}</h1>}
                {emailError && <Label pointing prompt color='red'>{emailError}</Label>}
                
                
            </FormField>

            {!isEditable && <Button
        onClick={()=>setIsEditable(true)}
        size='large' inverted color='blue' style={{borderRadius: '25px', marginTop: '5vh'}}>Edit Profile</Button>}
        {isEditable && <ButtonGroup style={{marginTop: '5vh'}}>
            <Button onClick={()=>setIsEditable(false)}color='grey' inverted><Icon name='delete' /></Button>
            <Button inverted color='teal' type='submit' onClick={handleSubmit}>Update User</Button>
            </ButtonGroup>}
        </Form>
        
        </div>
    </div>
  )
}
