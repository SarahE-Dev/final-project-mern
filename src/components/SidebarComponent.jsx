import React from 'react'
import { Link } from 'react-router-dom'
import { Sidebar, Menu, MenuItem, SidebarPusher, Segment, SidebarPushable, Icon, Container, Divider } from 'semantic-ui-react'

export default function SidebarComponent() {
  return (
    
    <div style={{position: 'fixed', left: 0, width: '15vw', backgroundColor: 'black', height: '90vh'}}>
        
        <Menu as={Segment} style={{width: '15vw', height: '90vh', display: 'flex', justifyContent: 'space-evenly', fontSize: '1rem'}} vertical inverted>
            <MenuItem
            as={Link}
            to='/'
             style={{textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <div><Icon size='big'  color='yellow' name='fire'/><Icon size='big'  color='pink' name='music'/></div>
                
                <h3>FYRE TUNES</h3>
                </MenuItem>
                <MenuItem
                as={Link}
                to='/playlists'
                style={{textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <div><Icon size='large' circular name='headphones' color='teal' /></div>
                <h4 style={{}}>Playlists</h4>
                
                </MenuItem>
                <MenuItem
                as={Link}
                to='/favorites'
                style={{textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <div><Icon size='large' circular
                color='violet'
                name='heartbeat'/></div>
                
                <h4>Favorites</h4>
                </MenuItem>
                <Divider/>
        </Menu>
        
    </div>
        
  )
}
