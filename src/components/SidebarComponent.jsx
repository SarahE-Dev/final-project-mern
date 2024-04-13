import React from 'react'
import { Link } from 'react-router-dom'
import { Sidebar, Menu, MenuItem, SidebarPusher, Segment, SidebarPushable, Icon, Container, Divider } from 'semantic-ui-react'

export default function SidebarComponent() {
  return (
    
    <div style={{position: 'absolute', left: 0, width: '15vw', backgroundColor: 'black', height: '90vh', }} >
        
        <Menu  as={Segment} style={{width: '15vw', height: '90vh', display: 'flex', justifyContent: 'space-around', fontSize: '1em'}} vertical inverted>
            <MenuItem
            as={Link}
            to='/'
             style={{textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <div><Icon size='big'  color='purple' name='fire'/></div>
                
                <h2 className='sidebarMenu'>Home</h2>
                </MenuItem>
                <MenuItem
                as={Link}
                to='/playlists'
                style={{textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                <div><Icon size='large' circular name='headphones' color='blue' /></div>
                <h3 className='sidebarMenu' >Playlists</h3>
                
                </MenuItem>
                <MenuItem
                as={Link}
                to='/favorites'
                style={{textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <div><Icon size='large' circular
                color='violet'
                name='heartbeat'/></div>
                
                <h3 className='sidebarMenu'>Favorites</h3>
                </MenuItem>
                <Divider/>
        </Menu>
        
    </div>
        
  )
}
