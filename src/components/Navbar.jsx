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
      window.localStorage.clear()
    }
    // useEffect(() => {
    //   if(checkIfCookieExists()){
    //     logUserIn()
    //   }

    // }, [])
    
  return (
    
    <Menu   style={{backgroundColor: 'black', color: 'white', borderRadius: 0, height: '10vh', marginTop: 0,marginBottom: 0, width: '100vw'}}>
        
        <MenuItem  className='logo' style={{ color: 'white', fontFamily: 'Rock Salt', letterSpacing: '2px'}} as={Link} to='/'><Icon name='fire' color='yellow' />FYRE TUNES<Icon name='music' circular color='pink' /></MenuItem>
        <MenuMenu position='right' style={{ padding: 0}}>
          {state && state.user && 
          <>
          <MenuItem className='nav' style={{color: 'purple'}} as={Link} to='/profile'>
          {state.user.username}</MenuItem>
          <MenuItem className='nav' style={{color: 'white'}} onClick={handleLogout}>Logout</MenuItem></>}
           {!(state.user) && <>
           <MenuItem className='nav' to='/login' style={{color: 'white'}} as={Link}>Login</MenuItem>
           <MenuItem className='nav' style={{color: 'white'}} to='/signup' as={Link}>Signup</MenuItem>
           </>} 
        </MenuMenu>
    </Menu>
    
  )
}
