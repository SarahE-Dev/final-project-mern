import React, { useContext, useState, useEffect } from 'react'
import { Icon, Label, Menu, MenuItem, MenuMenu, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { AuthContextConsumer } from '../context/AuthContext'
import Cookies from 'js-cookie'
import checkAuthCookie from './hooks/checkCookies'



export default function Navbar() {
    
    const {dispatch, state} = AuthContextConsumer()
    const {checkIfCookieExists, logUserIn} = checkAuthCookie()
    
    const handleLogout = () => {
      dispatch({type: 'LOGOUT'})
      Cookies.remove('music-app-cookie')
      localStorage.clear()
    }
    useEffect(() => {
      if(checkIfCookieExists()){
        logUserIn()
      }

    }, [])
    
    console.log(state);
  return (
    
    <Menu secondary size='large' style={{backgroundColor: 'blueviolet', color: 'white', borderRadius: 0, height: '10vh', marginTop: 0,marginBottom: 0, fontSize: 20}}>
        
        <MenuItem style={{fontSize: 30, color: 'white'}} as={Link} to='/'><Icon name='fire' color='yellow' />FYRE TUNES<Icon name='music' style={{marginLeft: '8px'}} color='pink' /></MenuItem>
        <MenuMenu position='right'>
          {state && state.user && 
          <>
          <MenuItem >
          <Label as={Link} size='big'  color='teal'>{state.user.username}</Label></MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem></>}
           {!(state.user) && <>
           <MenuItem to='/login' as={Link}>Login</MenuItem>
           <MenuItem to='/signup' as={Link}>Signup</MenuItem>
           </>} 
        </MenuMenu>
    </Menu>
    
  )
}
