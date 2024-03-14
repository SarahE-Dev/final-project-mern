import React from 'react'
import { Link } from 'react-router-dom'
import { Sidebar, Menu, MenuItem, SidebarPusher, Segment, SidebarPushable, Icon, Container, Divider } from 'semantic-ui-react'

export default function SidebarComponent() {
  return (
    
    <div style={{position: 'fixed', left: 0, width: '15vw', backgroundColor: 'black', height: '90vh'}}>
        
        <Menu as={Segment} style={{width: '15vw', height: '90vh', display: 'flex', justifyContent: 'space-evenly'}} vertical inverted>
            <MenuItem
            as={Link}
            to='/'
             style={{textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <div><Icon size='big'  color='yellow' name='fire'/><Icon size='big'  color='pink' name='music'/></div>
                
                <h1>FYRE TUNES</h1>
                </MenuItem>
                <MenuItem
                as={Link}
                to='/playlists'
                style={{textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <div><Icon size='big' circular name='headphones' color='teal' /></div>
                <h3 style={{}}>Playlists</h3>
                
                </MenuItem>
                <MenuItem
                as={Link}
                to='/favorites'
                style={{textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <div><Icon size='big' circular
                color='violet'
                name='heartbeat'/></div>
                
                <h3>Favorites</h3>
                </MenuItem>
                <Divider/>
        </Menu>
        
    </div>
        
  )
}
