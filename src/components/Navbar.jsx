import React, { useContext, useState } from 'react'
import { Icon, Menu, MenuItem, MenuMenu, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { AuthContextConsumer } from '../context/AuthContext'
import Cookies from 'js-cookie'

export default function Navbar() {
    const [activeItem, setActiveItem] = useState('home')
    const {dispatch} = AuthContextConsumer()
    const handleClick=(e)=>{
        setActiveItem(e.target.name)
        console.log(e.target.name);
    }
    const handleLogout = () => {
      dispatch({type: 'LOGOUT'})
      Cookies.remove('music-app-cookie')
      localStorage.clear()
    }
  return (
    
    <Menu secondary size='large' style={{backgroundColor: 'blueviolet', color: 'white', borderRadius: 0, height: '10vh', marginTop: 0,marginBottom: 0, fontSize: 20}}>
        
        <MenuItem style={{fontSize: 30, color: 'white'}} as={Link} to='/'><Icon name='fire' color='yellow' />FYRE TUNES<Icon name='music' style={{marginLeft: '8px'}} color='pink' /></MenuItem>
        <MenuMenu position='right'>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </MenuMenu>
    </Menu>
    
  )
}
